function getParentElement(name) {
    var element = document.querySelector(name)
    while (element.parentElement) {
        element = element.parentElement
        if (element.matches('.form-group')) {
            return element
        }
    }
}


function show(name, errorMessage) {
    let errorElement = getParentElement(name).querySelector('.form-message')
    errorElement.innerHTML = errorMessage
}
// kiem tra co rong hay k
function isRequired(name) {
    const element = document.querySelector(name)
    if (!element.value.trim()) {
        show(name, 'Vui lòng nhập trường này')
        return 1
    }
    else {
        show(name, '')
        return undefined
    }
}


function isEmail(nameEmail) {
    if (nameEmail == '#email') {
        const elementEmail = document.querySelector(nameEmail)
        let re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (elementEmail.value.trim()) {
            if (!re.test(elementEmail.value)) {
                show(nameEmail, 'Nhập lại email')
                return 1
            }
            else {
                show(nameEmail, '')
                return undefined
            }
        }
    }
}


function isPhone(namePhone) {
    if (namePhone == '#phone') {
        const elementPhone = document.querySelector(namePhone)
        let re = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
        if (elementPhone.value.trim()) {
            if (!re.test(elementPhone.value)) {
                show(namePhone, 'Sai định dạng')
                return 1
            }
            else {
                show(namePhone, '')
                return undefined
            }
        }
    }
}

var listValidate = ['#ho', '#ten', '#phone', '#email', '#tinh', '#huyen', '#xa']
function validate(listName) {
    const btn = document.querySelector('.active')
    listName.forEach(name => {
        var element = document.querySelector(name)
        btn.addEventListener('click', function () {
            if (isRequired(name) || isPhone(name) || isEmail(name)) {
                element.classList.add('input-error')
            }
        })
        element.addEventListener('change', function () {
            element.style.borderColor = '#e0e0e0'
            show(name, '')
        })
    });
}

validate(listValidate)


