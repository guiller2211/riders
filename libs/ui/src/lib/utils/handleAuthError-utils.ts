export function handleAuthError(error: any): string {
    switch (error) {
        case 'auth/claims-too-large':
            return 'La carga útil de la reclamación supera el tamaño máximo de 1,000 bytes.';
        case 'auth/email-already-exists':
        case 'auth/email-already-in-use':
            return 'El correo electrónico ya está en uso. Por favor, utiliza otro.';
        case 'auth/id-token-expired':
            return 'El token de ID ha expirado. Por favor, inicia sesión nuevamente.';
        case 'auth/id-token-revoked':
            return 'El token de ID ha sido revocado.';
        case 'auth/insufficient-permission':
            return 'No tienes permisos suficientes para realizar esta operación.';
        case 'auth/internal-error':
            return 'Se ha producido un error inesperado en el servidor. Por favor, intenta nuevamente más tarde.';
        case 'auth/invalid-argument':
            return 'Se proporcionó un argumento no válido. Verifica la información y vuelve a intentarlo.';
        case 'auth/invalid-claims':
            return 'Los atributos personalizados de reclamo son inválidos.';
        case 'auth/invalid-continue-uri':
            return 'La URL de continuación debe ser válida.';
        case 'auth/invalid-creation-time':
            return 'La hora de creación debe ser una fecha válida en formato UTC.';
        case 'auth/invalid-credential':
            return 'La credencial proporcionada es inválida.';
        case 'auth/invalid-disabled-field':
            return 'El campo "disabled" debe ser un booleano válido.';
        case 'auth/invalid-display-name':
            return 'El nombre mostrado debe ser una cadena no vacía.';
        case 'auth/invalid-dynamic-link-domain':
            return 'El dominio del vínculo dinámico no está configurado o no está autorizado.';
        case 'auth/invalid-email':
            return 'El correo electrónico proporcionado no es válido.';
        case 'auth/invalid-email-verified':
            return 'El campo "emailVerified" debe ser un booleano.';
        case 'auth/invalid-hash-algorithm':
            return 'El algoritmo de hash debe ser uno de los compatibles.';
        case 'auth/invalid-hash-block-size':
            return 'El tamaño del bloque de hash debe ser un número válido.';
        case 'auth/invalid-hash-derived-key-length':
            return 'La longitud de la clave derivada debe ser un número válido.';
        case 'auth/invalid-hash-key':
            return 'La clave de hash debe ser un búfer de bytes válido.';
        case 'auth/invalid-hash-memory-cost':
            return 'El costo de memoria de hash debe ser un número válido.';
        case 'auth/invalid-hash-parallelization':
            return 'La paralelización de hash debe ser un número válido.';
        case 'auth/invalid-hash-rounds':
            return 'Las rondas de hash deben ser un número válido.';
        case 'auth/invalid-hash-salt-separator':
            return 'El separador de sal debe ser un búfer de bytes válido.';
        case 'auth/invalid-id-token':
            return 'El token de ID proporcionado no es válido.';
        case 'auth/invalid-last-sign-in-time':
            return 'La hora del último acceso debe ser una fecha válida en formato UTC.';
        case 'auth/invalid-page-token':
            return 'El token de página siguiente no es válido.';
        case 'auth/invalid-password':
            return 'La contraseña debe tener al menos seis caracteres.';
        case 'auth/invalid-password-hash':
            return 'El hash de contraseña debe ser un búfer de bytes válido.';
        case 'auth/invalid-password-salt':
            return 'La sal de la contraseña debe ser un búfer de bytes válido.';
        case 'auth/invalid-phone-number':
            return 'El número de teléfono no es válido. Debe cumplir con el estándar E.164.';
        case 'auth/invalid-photo-url':
            return 'La URL de la foto debe ser válida.';
        case 'auth/invalid-provider-data':
            return 'Los datos del proveedor no son válidos.';
        case 'auth/invalid-provider-id':
            return 'El identificador del proveedor no es válido.';
        case 'auth/invalid-oauth-responsetype':
            return 'Solo se debe configurar un responseType de OAuth como verdadero.';
        case 'auth/invalid-session-cookie-duration':
            return 'La duración de la cookie de sesión debe ser un número válido.';
        case 'auth/invalid-uid':
            return 'El uid proporcionado debe ser una cadena no vacía con un máximo de 128 caracteres.';
        case 'auth/invalid-user-import':
            return 'El registro de usuario para importar no es válido.';
        case 'auth/maximum-user-count-exceeded':
            return 'Se ha excedido la cantidad máxima de usuarios permitidos para importar.';
        case 'auth/missing-android-pkg-name':
            return 'Se debe proporcionar un nombre de paquete de Android.';
        case 'auth/missing-continue-uri':
            return 'Se debe proporcionar una URL de continuación válida.';
        case 'auth/missing-hash-algorithm':
            return 'Se debe proporcionar el algoritmo de hash para importar usuarios.';
        case 'auth/missing-ios-bundle-id':
            return 'Falta un ID de paquete en la solicitud.';
        case 'auth/missing-uid':
            return 'Se requiere un uid para la operación actual.';
        case 'auth/missing-oauth-client-secret':
            return 'El secreto de cliente de OAuth es obligatorio.';
        case 'auth/operation-not-allowed':
            return 'Este método de acceso está inhabilitado para tu proyecto.';
        case 'auth/phone-number-already-exists':
            return 'El número de teléfono ya está en uso. Por favor, utiliza otro.';
        case 'auth/project-not-found':
            return 'No se encontró ningún proyecto de Firebase para la credencial proporcionada.';
        case 'auth/reserved-claims':
            return 'Las reclamaciones personalizadas están reservadas y no pueden ser usadas.';
        case 'auth/session-cookie-expired':
            return 'La cookie de sesión ha expirado.';
        case 'auth/session-cookie-revoked':
            return 'La cookie de sesión ha sido revocada.';
        case 'auth/too-many-requests':
            return 'Demasiadas solicitudes. Por favor, intenta nuevamente más tarde.';
        case 'auth/uid-already-exists':
            return 'El uid ya está en uso. Por favor, utiliza otro.';
        case 'auth/unauthorized-continue-uri':
            return 'El dominio de la URL de continuación no está autorizado.';
        case 'auth/user-not-found':
            return 'No se encontró ningún registro de usuario correspondiente.';
        default:
            return 'Se ha producido un error desconocido. Por favor, intenta nuevamente.';
    }
}
