const useSymbolIterator = (to) => {
    let len = []
    let range = {
        from: 0,
        to: to,

        [Symbol.iterator]() {
            this.current = this.from;
            return this;
        },

        next() {
            if (this.current < this.to) {
                return { done: false, value: this.current++};
            } else {
                return { done: true };
            }
        }
    }
    for(let i of range)
        len.push(i)
    return len
}

export default useSymbolIterator