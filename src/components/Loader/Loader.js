import './loader.css';
const Loader = () => {
    return (
        <div className=' inline-block w-full align-middle' style={{paddingTop:'250px'}}>
            <div className='flex justify-center '>
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
               
            </div>
            <div className='flex justify-center mt-10'> 
            <h4 > Fetching Data</h4>
            </div>
        </div>

    )
}
export default Loader;