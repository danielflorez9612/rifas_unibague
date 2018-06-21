export const Validators = {
    required : value => {
        if(!value || value==='') {
            return ['Este campo es requerido!'];
        }
        return [];
    },
    email: value => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(value && !emailRegex.test(value)) {
            return ['Este campo debe ser un Email! ej. super@email.com'];
        }
        return [];
    }
};
export const Forms  =  {
    verifyCompletion(form) {
        let flag = true;
        const controlKeys = Object.keys(form.controls);
        for(const controlKey of  controlKeys){
            if(!form.controls[controlKey].value) {
                flag = false;
                break;
            }
        }
        form.isComplete = flag;
    },
    getValue({controls}) {
        const newObject = {};
        const controlKeys = Object.keys(controls);
        for(const controlKey of controlKeys) {
            if(controls[controlKey].numeric) {
                newObject[controlKey]  = Number(controls[controlKey].value);
            } else {
                newObject[controlKey]  = controls[controlKey].value;
            }
        }
        return newObject;
    }
};
export const ValidatorUtils = {
    updateErrors(form) {
        let flag = false;
        const controlKeys = Object.keys(form.controls);
        for(const controlKey of  controlKeys){
            if(form.controls[controlKey].errors && form.controls[controlKey].errors.length) {
                form.hasErrors = true;
                flag = true;
                break;
            }
        }
        if(!flag) {
            form.hasErrors = false;
        }
    },
    runValidationsOn(form, {value, name}) {
        form.controls[name].errors = [].concat.apply([], form.controls[name].validators.map(validator => validator(value)));
        ValidatorUtils.updateErrors(form);
    },
};