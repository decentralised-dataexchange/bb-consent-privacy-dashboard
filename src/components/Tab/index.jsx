import './tab.css';
import BackButton from '../BackButton/index';


const Tab = (props) => {
   
        const {title} = props;
        return (
            <div className='menu-tab'>
            <BackButton />
            <div className='menu-tab-header'><p>{title}</p></div>
                {props.children}
            </div>
        );
    }

export default Tab;