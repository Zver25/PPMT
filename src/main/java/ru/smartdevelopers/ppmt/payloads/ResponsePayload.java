package ru.smartdevelopers.ppmt.payloads;

public class ResponsePayload<T> {

    private boolean hasError;
    private String error = null;
    private T data = null;

    public boolean isHasError() {
        return hasError;
    }

    public String getError() {
        return error;
    }

    public T getData() {
        return data;
    }

    public ResponsePayload<T> setErrorPayload(String error) {
        this.hasError = true;
        this.error = error;
        this.data = null;
        return this;
    }

    public ResponsePayload<T> setDataPayload(T data) {
        this.hasError = false;
        this.error = null;
        this.data = data;
        return this;
    }
}
