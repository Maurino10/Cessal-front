

export default {

    setErrors (backendErrors, errors) {
        Object.keys(errors).forEach(key => {
            errors[key] = backendErrors[key] ?? null;
        });
    }
}