"use strict";
// Завдання: CoR
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
class RequestTo {
    request;
    constructor(request) {
        this.request = request;
    }
}
// виды сообщений, которые может обрабатывать цепочка
class RequestToCustomerDepartment extends RequestTo {
}
function isRequestToCustomerDepartment(type) {
    return type instanceof RequestToCustomerDepartment;
}
class RequestToFinancialDepartment extends RequestTo {
}
function isRequestToFinancialDepartment(type) {
    return type instanceof RequestToFinancialDepartment;
}
class RequestToTechnicalDepartment extends RequestTo {
}
function isRequestToTechnicalDepartment(type) {
    return type instanceof RequestToTechnicalDepartment;
}
class RequestToFeedbackAndComplaintsDepartment extends RequestTo {
}
function isRequestToFeedbackAndComplaintsDepartment(type) {
    return type instanceof RequestToFeedbackAndComplaintsDepartment;
}
class Department {
    _nextDepartment;
    get nextDepartment() {
        return this._nextDepartment;
    }
    toTheNextDepartment(department) {
        this._nextDepartment = department;
    }
}
// декоратор для автоматического дальнейшего вызова следующего звена
function toTheNextDepartmentDecorator(originalMethod, context) {
    return function (request) {
        originalMethod.call(this, request);
        if (this.nextDepartment) {
            this.nextDepartment.handleRequest(request);
        }
    };
}
let ContactingTheDepartment = (() => {
    let _classSuper = Department;
    let _instanceExtraInitializers = [];
    let _handleRequest_decorators;
    return class ContactingTheDepartment extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _handleRequest_decorators = [toTheNextDepartmentDecorator];
            __esDecorate(this, null, _handleRequest_decorators, { kind: "method", name: "handleRequest", static: false, private: false, access: { has: obj => "handleRequest" in obj, get: obj => obj.handleRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        handleRequest(request) {
            console.log('Hello\n');
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
let CustomerDepartment = (() => {
    let _classSuper = Department;
    let _instanceExtraInitializers = [];
    let _handleRequest_decorators;
    return class CustomerDepartment extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _handleRequest_decorators = [toTheNextDepartmentDecorator];
            __esDecorate(this, null, _handleRequest_decorators, { kind: "method", name: "handleRequest", static: false, private: false, access: { has: obj => "handleRequest" in obj, get: obj => obj.handleRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        handleRequest(request) {
            request.forEach(item => {
                if (isRequestToCustomerDepartment(item)) {
                    console.log(`contacting the customer department - ${item.request}`);
                }
            });
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
let FinancialDepartment = (() => {
    let _classSuper = Department;
    let _instanceExtraInitializers = [];
    let _handleRequest_decorators;
    return class FinancialDepartment extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _handleRequest_decorators = [toTheNextDepartmentDecorator];
            __esDecorate(this, null, _handleRequest_decorators, { kind: "method", name: "handleRequest", static: false, private: false, access: { has: obj => "handleRequest" in obj, get: obj => obj.handleRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        handleRequest(request) {
            request.forEach(item => {
                if (isRequestToFinancialDepartment(item)) {
                    console.log(`contacting the financial department - ${item.request}`);
                }
            });
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
let TechnicalDepartment = (() => {
    let _classSuper = Department;
    let _instanceExtraInitializers = [];
    let _handleRequest_decorators;
    return class TechnicalDepartment extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _handleRequest_decorators = [toTheNextDepartmentDecorator];
            __esDecorate(this, null, _handleRequest_decorators, { kind: "method", name: "handleRequest", static: false, private: false, access: { has: obj => "handleRequest" in obj, get: obj => obj.handleRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        handleRequest(request) {
            request.forEach(item => {
                if (isRequestToTechnicalDepartment(item)) {
                    console.log(`contacting the technical department - ${item.request}`);
                }
            });
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
let FeedbackAndComplaintsDepartment = (() => {
    let _classSuper = Department;
    let _instanceExtraInitializers = [];
    let _handleRequest_decorators;
    return class FeedbackAndComplaintsDepartment extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _handleRequest_decorators = [toTheNextDepartmentDecorator];
            __esDecorate(this, null, _handleRequest_decorators, { kind: "method", name: "handleRequest", static: false, private: false, access: { has: obj => "handleRequest" in obj, get: obj => obj.handleRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        handleRequest(request) {
            request.forEach(item => {
                if (isRequestToFeedbackAndComplaintsDepartment(item)) {
                    console.log(`contacting the feedback and complaints department - ${item.request}`);
                }
            });
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
// examples
const contactingTheCompany = new ContactingTheDepartment();
const customerDepartment = new CustomerDepartment();
const financialDepartment = new FinancialDepartment();
const technicalDepartment = new TechnicalDepartment();
const feedbackAndComplaints = new FeedbackAndComplaintsDepartment();
contactingTheCompany.toTheNextDepartment(customerDepartment);
customerDepartment.toTheNextDepartment(technicalDepartment);
financialDepartment.toTheNextDepartment(financialDepartment);
technicalDepartment.toTheNextDepartment(feedbackAndComplaints);
class TextClass {
}
const clientRequests = [new RequestToTechnicalDepartment('technical: problem'), /* new TextClass () - error */ new RequestToCustomerDepartment('in customer'), new RequestToTechnicalDepartment('technical: another problem')];
contactingTheCompany.handleRequest(clientRequests);
