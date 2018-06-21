export const Validators = {
    required : value => {
        if(!value || value==='') {
            return ['Este campo es requerido!'];
        }
        return [];
    },
    email: value => {
        if(value && !value.split('').find(v => v ==='@')) {
            return ['Este campo debe ser un Email! ej. super@email.com'];
        }
        return [];
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
        form.controls[name].errors = [].concat.apply([],form.controls[name].validators.map(validator => validator(value)));
        ValidatorUtils.updateErrors(form);
    }
}