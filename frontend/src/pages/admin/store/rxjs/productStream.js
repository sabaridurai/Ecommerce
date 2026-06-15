import { BehaviorSubject } from "rxjs";

const productSubject = new BehaviorSubject([]);

export const product$ = productSubject.asObservable();

export const updateProductStream = (data) => {
  productSubject.next(data);
};