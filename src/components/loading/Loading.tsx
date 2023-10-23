

export const Loading = () => {

    const load = (delay: number): string => {
        let str = ""
        setInterval(() => {
            str = '.'
        }, delay)
        return str;
    }

    return(
        <div>
            <div>
                Loading...
                {/*{load(10)}*/}
            </div>
        </div>
    )
}