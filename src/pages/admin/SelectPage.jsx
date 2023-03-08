import { Select } from '../../components/select/Select'

export const SelectPage = () => {

    const options = [
        { value: 1, text: 'Canadá'}, 
        { value: 2, text: 'Italia'}, 
        { value: 3, text: 'España'}
    ]
    //const [selected, setSelected] = useState({ value: '', text: '' })

    const options1 = [
        { value: 1, text: 'Canadá'}, 
        { value: 2, text: 'Italia'}, 
        { value: 3, text: 'España'}
    ]
    const preSelected1 = [{ value: 1, text: 'Canadá'}, { value: 2, text: 'Italia'}]

    const options2 = [
        { value: 1, text: 'Canadá'}, 
        { value: 2, text: 'Italia'}, 
        { value: 3, text: 'España'}
    ]
    const preSelected2 = [{ value: 1, text: 'Canadá'}]

    function handleActionSelected(selected, field) {
        //console.log('Child did:', selected);
    }

    return (
        <div className='grid grid-cols-3 gap-3 p-3'>
            <div className='border p-6 rounded shadow'>
                <div className='text-center mb-6'><span className='font-semibold'>Selección única:</span></div>
                <Select handleActionSelected={handleActionSelected} options={options} label={'Países:'}></Select>
            </div>
            <div className='border p-6 rounded shadow'>
                <div className='text-center mb-6'><span className='font-semibold'>Slección múltiple:</span></div>
                <Select handleActionSelected={handleActionSelected} options={options1} label={'Países:'} multiple={true} flexLabel={true} preSelected={preSelected1}></Select>
            </div>
            <div className='border p-6 rounded shadow'>
                <div className='text-center mb-6'><span className='font-semibold'>Preseleccionado:</span></div>
                <Select handleActionSelected={handleActionSelected} options={options2} label={'Países:'} preSelected={preSelected2}></Select>
            </div>
            <div className='border p-6 rounded shadow'>
                <div className='text-center mb-6'><span className='font-semibold'>Deshabilitado:</span></div>
                <Select handleActionSelected={handleActionSelected} options={options2} label={'Países:'} disabled={true}></Select>
            </div>
        </div>
    )
}
