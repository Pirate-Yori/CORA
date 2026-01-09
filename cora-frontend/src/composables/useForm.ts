import { computed, reactive, ref, type UnwrapRef } from "vue"
import type { ValidationException } from "@/types"

interface ValidationRule {
    required?: boolean
    email?: boolean
    min?: number
    max?: number
    pattern?: RegExp
    custom?: (value: any) => boolean | string
    message?: string
}

type ValidationRules<T> = {
    [k in keyof T]?: ValidationRule[]
}

/**
 * Composable ppour gérer les formulaires avec validation
 */
export function useForm<T extends Record<string, any>>(
    initialValues: T,
    validationRules?: ValidationRules<T>
) {
    const values = reactive({ ...initialValues }) as UnwrapRef<T>
    const errors = reactive<Partial<Record<keyof T, string>>>({}) as Partial<Record<keyof T, string>>
    const touched = reactive<Partial<Record<keyof T, boolean>>>({}) as Partial<Record<keyof T, boolean>>
    const isSubmitting = ref(false)
    const isDirty = ref(false)

    const hasErrors = computed(() => Object.keys(errors).length > 0)
    const isValid = computed(() => !hasErrors.value)

    /**
     * Met à jour une valeur du formulaire
     */
    const setValue = <K extends keyof T>(field: K, value: T[K]) => {
        (values as Record<string, any>)[field as string] = value
        touched[field] = true
        isDirty.value = true

        // Valider le champ si des règles existent
        if (validationRules?.[field]) {
            validateField(field)
        }
    }

    /**
     * Met à jour plusieurs valeurs
     */
    const setValues = (newValues: Partial<T>) => {
        Object.entries(newValues).forEach(([key, value]) => {
            setValue(key as keyof T, value as T[keyof T])
        })
    }

    /**
     * Valide un champ
     */
    const validateField = <k extends keyof T>(field: k): boolean => {
        const rules = validationRules?.[field]
        if (!rules) return true

        const value = values[field as keyof typeof values]

        for (const rule of rules) {
            // Required
            if (rule.required && !value) {
                errors[field] = rule.message || 'Ce champ est obligatoire'
                return false
            }

            //Email
            if (rule.email && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(String(value))) {
                    errors[field] = rule.message || 'Email invalide'
                    return false
                }
            }
            // Min length
            if (rule.min && value) {
                if (String(value).length < rule.min) {
                    errors[field] = rule.message || `Minimum ${rule.min} caractères`
                    return false
                }
            }

            // Max length
            if (rule.max && value) {
                if (String(value).length > rule.max) {
                    errors[field] = rule.message || `Maximum ${rule.max} caractères`
                    return false
                }
            }

            // Pattern
            if (rule.pattern && value) {
                if (!rule.pattern.test(String(value))) {
                    errors[field] = rule.message || 'Format invalide'
                    return false
                }
            }

            // Custom validation
            if (rule.custom && value) {
                const result = rule.custom(value)
                if (result !== true) {
                    errors[field] = typeof result === 'string' ? result : rule.message || 'Validation échouée'
                    return false
                }
            }
        }

        // Pas d'erreur
        delete errors[field]
        return true
    }

    /**
     * Valide tous les champs
     */
    const validate = (): boolean => {
        if (!validationRules) return true

        let isValid = true
        Object.keys(validationRules).forEach(field => {
            if (!validateField(field as keyof T)) {
                isValid = false
            }
        })

        return isValid
    }

    /**
    * Définit les erreurs depuis l'API (ValidationException)
    */
    const setErrors = (apiErrors: Record<string, string[]>) => {
        Object.entries(apiErrors).forEach(([field, messages]) => {
            errors[field as keyof T] = messages[0]
        })
    }

    /**
     * Gère les erreurs de validation de l'API
     */
    const handleApiError = (error: any) => {
        if (error instanceof Error && 'errors' in error) {
            const validationError = error as ValidationException
            if (validationError.errors) {
                setErrors(validationError.errors)
            }
        }
    }

    /**
     * Efface les erreurs
     */
    const clearErrors = () => {
        Object.keys(errors).forEach(key => {
            delete errors[key as keyof T]
        })
    }

    /**
     * Efface une erreur spécifique
     */
    const clearError = <K extends keyof T>(field: K) => {
        delete errors[field]
    }

    /**
     * Réinitialise le formulaire
     */
    const reset = () => {
        Object.assign(values as Record<string, any>, initialValues as Record<string, any>)
        clearErrors()
        Object.keys(touched).forEach(key => {
            touched[key as keyof T] = false
        })
        isDirty.value = false
        isSubmitting.value = false
    }

    /**
     * Soumet le formulaire
     */
    const submit = async (
        onSubmit: (values: T) => Promise<void> | void
    ): Promise<boolean> => {
        if (!validate()) {
            return false
        }

        try {
            isSubmitting.value = true
            await onSubmit(values as T)
            return true
        } catch (error) {
            handleApiError(error)
            return false
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isDirty,
        hasErrors,
        isValid,
        setValue,
        setValues,
        validateField,
        validate,
        setErrors,
        handleApiError,
        clearErrors,
        clearError,
        reset,
        submit,
    }
}