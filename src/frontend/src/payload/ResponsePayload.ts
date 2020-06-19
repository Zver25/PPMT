export default interface ResponsePayload<R> {
    hasError: boolean;
    error?: string;
    data: R;
}
