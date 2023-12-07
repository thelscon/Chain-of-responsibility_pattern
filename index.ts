// Завдання: CoR

// Представте, що ви розробляєте систему обробки звернень для компанії з великим обсягом клієнтів. 
// Запити можуть стосуватися різних питань, таких як технічна підтримка, платіжні питання, 
// запити на повернення товарів тощо. Кожен тип запиту потребує власної обробки.


// Решение задачи является более типобезопасным:
// - цепочка состоит с определенных депортаментов и работает с определёнными видами сообщений, 
// - другие виды сообщений нельзя передать (в примере в конце массив сообщений с error), 
// - также сообщения нельзя изменить внутри цепочки


// структура сообщения
interface IRequestTo {
    readonly request : string
}
abstract class RequestTo implements IRequestTo {
    constructor (
        public readonly request : string
    ) {}
}

// виды сообщений, которые может обрабатывать цепочка
class RequestToCustomerDepartment extends RequestTo {}
function isRequestToCustomerDepartment (type : IRequestTo) : type is RequestToCustomerDepartment {
    return type instanceof RequestToCustomerDepartment
}
class RequestToFinancialDepartment extends RequestTo {}
function isRequestToFinancialDepartment (type : IRequestTo) : type is RequestToFinancialDepartment {
    return type instanceof RequestToFinancialDepartment
}
class RequestToTechnicalDepartment extends RequestTo {}
function isRequestToTechnicalDepartment (type : IRequestTo) : type is RequestToTechnicalDepartment {
    return type instanceof RequestToTechnicalDepartment
}
class RequestToFeedbackAndComplaintsDepartment extends RequestTo {}
function isRequestToFeedbackAndComplaintsDepartment (type : IRequestTo) : type is RequestToFeedbackAndComplaintsDepartment {
    return type instanceof RequestToFeedbackAndComplaintsDepartment
}

//объединяем их в один
type requestToTypes = RequestToCustomerDepartment
                        | RequestToFinancialDepartment
                        | RequestToTechnicalDepartment
                        | RequestToFeedbackAndComplaintsDepartment
// и все департаменты
type departmentsType = ContactingTheDepartment 
                        | CustomerDepartment 
                        | FinancialDepartment 
                        | TechnicalDepartment 
                        | FeedbackAndComplaintsDepartment

// вид сообщений - это неизменяемый массив ранее указанных сообщений
type requestType = Readonly<requestToTypes[]>
type handleRequestType = (request : requestType) => void

// структура для депортаментов
interface IDepartment {
    readonly nextDepartment ?: departmentsType
    readonly toTheNextDepartment : (department : departmentsType) => void
    readonly handleRequest : handleRequestType
}
abstract class Department implements IDepartment {
    private _nextDepartment ?: departmentsType
    
    public get nextDepartment () : departmentsType | undefined {
        return this._nextDepartment
    }

    toTheNextDepartment (department : departmentsType) {
        this._nextDepartment = department
    }

    abstract handleRequest (request : requestType) : void
}
// декоратор для автоматического дальнейшего вызова следующего звена
function toTheNextDepartmentDecorator<D extends departmentsType> (
    originalMethod : handleRequestType ,
    context : ClassMethodDecoratorContext<D , typeof originalMethod>) {
        
        return function (this : D , request : requestType) {
            originalMethod.call (this , request)

            if (this.nextDepartment) {
                this.nextDepartment.handleRequest (request)
            }
        }
}

class ContactingTheDepartment extends Department {

    @toTheNextDepartmentDecorator
    handleRequest (request : requestType) {
        console.log ('Hello\n')
    }
}
class CustomerDepartment extends Department {

    @toTheNextDepartmentDecorator
    handleRequest (request : requestType) {
        request.forEach (item => {
            if (isRequestToCustomerDepartment (item)) {
                console.log (`contacting the customer department - ${item.request}`) 
            }
        })
    }
}
class FinancialDepartment extends Department {

    @toTheNextDepartmentDecorator
    handleRequest (request : requestType) {
        request.forEach (item => {
            if (isRequestToFinancialDepartment (item)) {
                console.log (`contacting the financial department - ${item.request}`) 
            }
        })
    }
}
class TechnicalDepartment extends Department {
    
    @toTheNextDepartmentDecorator
    handleRequest (request : requestType) {
        request.forEach (item => {
            if (isRequestToTechnicalDepartment (item)) {
                console.log (`contacting the technical department - ${item.request}`) 
            }
        })
    }
}
class FeedbackAndComplaintsDepartment extends Department {

    @toTheNextDepartmentDecorator
    handleRequest (request : requestType) {
        request.forEach (item => {
            if (isRequestToFeedbackAndComplaintsDepartment (item)) {
                console.log (`contacting the feedback and complaints department - ${item.request}`)
            }
        })
    }
}

// examples
const contactingTheCompany = new ContactingTheDepartment ()
const customerDepartment = new CustomerDepartment ()
const financialDepartment = new FinancialDepartment ()
const technicalDepartment = new TechnicalDepartment ()
const feedbackAndComplaints = new FeedbackAndComplaintsDepartment ()

contactingTheCompany.toTheNextDepartment (customerDepartment)
customerDepartment.toTheNextDepartment (technicalDepartment)
financialDepartment.toTheNextDepartment (financialDepartment)
technicalDepartment.toTheNextDepartment (feedbackAndComplaints)

class TextClass {}
const clientRequests = [new RequestToTechnicalDepartment ('technical: problem') , /* new TextClass () - error */ new RequestToCustomerDepartment ('in customer') , new RequestToTechnicalDepartment ('technical: another problem')]


contactingTheCompany.handleRequest (clientRequests)