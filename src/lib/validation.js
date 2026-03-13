export const loginValidation = ({ email, password, language }) => {

    const errors = []

    if (email && password) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const contactValidation = ({ email, name, phone, message, language }) => {
    const errors = {}

    if(!name) {
        errors['name'] = language.res.nameMissing
    }

    if (phone) {
        if (phone.match(/^[+-]?\d+(\.\d+)?$/)) {
            
        } else {
            errors['phone'] = language.res.phoneInvalidError
        }
    }
        
    if (!email) {
        errors['email'] = language.res.emailMissing
    } else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        errors['email'] = language.res.emailInvalidError
    }

    return errors
}

export const postValidation = ({ user_id, content, pictures, language }) => {
    {
        const errors = []

        if (user_id && content && pictures) {
        } else {
            errors.push(language.res.missingFields)
        }

        return errors
    }
}

export const postUpdateValidation = ({ title, description, picture, language }) => {
    {
        const errors = []

        if (title) {
            if (title.length > 50) {
                errors.push("Post title must be no longer than 50 characters")
            }
        }
        if (description) {
            if (description.length < 50) {
                errors.push("Post description must be longer than 50 characters")
            }
        }

        return errors
    }
}

export const likeValidation = ({ user_id, post_id, language }) => {
    {
        const errors = []

        if (user_id && post_id) {
        } else {
            errors.push(language.res.missingFields)
        }

        return errors
    }
}

export const commentValidation = ({ user_id, post_id, comment, language }) => {
    {
        const errors = []

        if (user_id && post_id && comment) {
        } else {
            errors.push(language.res.missingFields)
        }

        return errors
    }
}

export const projectValidation = ({ title, description, slug, language }) => {
    const errors = []

    if (title && description && slug) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const skillValidation = ({ title, tags, language }) => {
    const errors = []

    if (title && tags) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const experienceValidation = ({ title, organization, year, language }) => {
    const errors = []

    if (title && organization && year) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const serviceValidation = ({ title, description, language }) => {
    const errors = []

    if (title && description) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const settingsValidation = ({ lang, language }) => {
    const errors = []

    if (lang) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}