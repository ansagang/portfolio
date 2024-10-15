export const loginValidation = ({ email, password, language }) => {

    const errors = []

    if (email && password) {
    } else {
        errors.push(language.res.missingFields)
    }

    return errors
}

export const contactValidation = ({ email, first_name, last_name, message, language }) => {
    const errors = []
    if (first_name && email && last_name && message) {

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            errors.push(language.res.emailInvalidError)
        }
    } else {
        errors.push(language.res.missingFields)
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