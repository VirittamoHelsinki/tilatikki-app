
import { usePremiseAction } from '../../hooks/usePremise';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Testing = () => {
    const {updateCounter} = usePremiseAction()
    const {value} = useTypedSelector(state => state.Data);

    console.log(value)



    return (
        <div>
            <h1>Hello</h1>
            <button onClick={()=> updateCounter()}>click me</button>
        </div>
    )
}

export default Testing