import { useState, useEffect, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod/v4';

export type FieldType = 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'date' | 'file' | 'budget_slider' | 'timeline' | 'heading' | 'paragraph';

export interface FormFieldConfig {
  id: string;
  label: string;
  fieldType: FieldType;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  displayOrder: number;
  validationRules?: Record<string, any>;
  conditionalLogic?: {
    fieldId: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: string;
  } | null;
  options?: { id: string; label: string; value: string }[];
}

export interface FormTemplateConfig {
  id: string;
  name: string;
  fields: FormFieldConfig[];
  steps?: { title: string; fields: string[] }[];
}

function buildZodSchema(fields: FormFieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    if (field.fieldType === 'heading' || field.fieldType === 'paragraph') continue;
    let schema: z.ZodTypeAny;
    switch (field.fieldType) {
      case 'text':
      case 'textarea':
        schema = z.string();
        if (field.required) schema = (schema as z.ZodString).min(1, `${field.label} is required`);
        if (field.validationRules?.maxLength) schema = (schema as z.ZodString).max(field.validationRules.maxLength);
        if (field.validationRules?.pattern) schema = (schema as z.ZodString).regex(new RegExp(field.validationRules.pattern));
        break;
      case 'select':
      case 'radio':
        schema = z.string();
        if (field.required) schema = (schema as z.ZodString).min(1, `${field.label} is required`);
        break;
      case 'multiselect':
        schema = z.array(z.string());
        if (field.required) schema = (schema as z.ZodArray<any>).min(1, `${field.label} is required`);
        break;
      case 'checkbox':
        if (field.options && field.options.length > 0) {
          schema = z.array(z.string());
          if (field.required) schema = (schema as z.ZodArray<any>).min(1, `${field.label} is required`);
        } else {
          schema = z.boolean();
          if (field.required) schema = (schema as z.ZodBoolean).refine((v) => v === true, `${field.label} must be checked`);
        }
        break;
      case 'date':
        schema = z.string();
        if (field.required) schema = (schema as z.ZodString).min(1, `${field.label} is required`);
        break;
      case 'file':
        schema = z.any().optional();
        break;
      case 'budget_slider':
        schema = z.number();
        if (field.required) schema = (schema as z.ZodNumber).min(1, `${field.label} is required`);
        break;
      case 'timeline':
        schema = z.string();
        if (field.required) schema = (schema as z.ZodString).min(1, `${field.label} is required`);
        break;
      default:
        schema = z.string().optional();
    }
    shape[field.id] = schema;
  }
  return z.object(shape);
}

export function useFormEngine(fields: FormFieldConfig[], steps?: FormTemplateConfig['steps']) {
  const schema = buildZodSchema(fields);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, f) => {
      if (f.fieldType === 'multiselect' || (f.fieldType === 'checkbox' && f.options && f.options.length > 0)) acc[f.id] = [];
      else if (f.fieldType === 'checkbox') acc[f.id] = false;
      else if (f.fieldType === 'budget_slider') acc[f.id] = 0;
      else acc[f.id] = '';
      return acc;
    }, {} as Record<string, any>),
  });

  const watchedValues = useWatch({ control: form.control });

  const visibleFields = fields.filter((field) => {
    if (!field.conditionalLogic) return true;
    const watchedValue = watchedValues[field.conditionalLogic.fieldId];
    switch (field.conditionalLogic.operator) {
      case 'equals': return watchedValue === field.conditionalLogic.value;
      case 'not_equals': return watchedValue !== field.conditionalLogic.value;
      case 'contains': return String(watchedValue).includes(field.conditionalLogic.value);
      case 'greater_than': return Number(watchedValue) > Number(field.conditionalLogic.value);
      case 'less_than': return Number(watchedValue) < Number(field.conditionalLogic.value);
      default: return true;
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps?.length ?? 1;

  const getCurrentStepFields = useCallback(() => {
    if (!steps) return visibleFields;
    const stepFieldIds = steps[currentStep]?.fields ?? [];
    return visibleFields.filter((f) => stepFieldIds.includes(f.id));
  }, [steps, currentStep, visibleFields]);

  const canGoNext = useCallback(() => {
    if (!steps) return true;
    const stepFields = getCurrentStepFields();
    const values = form.getValues();
    return stepFields.every((f) => {
      if (!f.required) return true;
      const val = values[f.id];
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'boolean') return val === true;
      if (typeof val === 'number') return val > 0;
      return !!val;
    });
  }, [steps, currentStep, getCurrentStepFields, form]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) setCurrentStep((s) => s + 1);
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  return {
    form,
    visibleFields,
    currentStep,
    totalSteps,
    setCurrentStep,
    nextStep,
    prevStep,
    canGoNext,
    getCurrentStepFields,
    schema,
  };
}
