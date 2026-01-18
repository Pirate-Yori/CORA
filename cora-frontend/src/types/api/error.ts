export interface ValidationError {
    field: string
    message: string
}

export interface ApiError {
    message: string
    errors?: Record<string, string[]>
    status?: number
}

export class ApiException extends Error {
    status: number
    errors?: Record<string, string[]>;

    constructor(message: string, status: number = 500, errors?: Record<string, string[]>) {
        super(message);
        this.name = "ApiException";
        this.status = status;
        this.errors = errors
    }

    get ValidationErrors(): ValidationError[] {
        if (!this.errors) return [];

        return Object.entries(this.errors).flatMap(([field, messages]) => messages.map(message => ({ field, message })))
    }

    getFieldErrors(field: string): string | undefined {
        return this.errors?.[field]?.[0]
    }
}

export class UnauthorizedError extends ApiException{
    constructor(message:string ="Non Authentifié"){
        super(message,401);
        this.name="UnauthorizedError"
    }
}
export class ForbiddenError extends ApiException{
    constructor(message: string = "Accès refusé") {
        super(message, 403);
        this.name = "ForbiddenError";
    }
}
export class NotFoundError extends ApiException{
    constructor(message: string = "Ressource non trouvée") {
        super(message, 404);
        this.name = "NotFoundError";
    }
}
export class ValidationException extends ApiException {
    constructor(message: string = "Données invalides", errors?: Record<string, string[]>) {
        super(message, 422, errors);
        this.name = "ValidationException";
    }
}
export class ServerError extends ApiException{
    constructor(message: string = "Erreur serveur") {
        super(message, 500);
        this.name = "ServerError";
    }
}