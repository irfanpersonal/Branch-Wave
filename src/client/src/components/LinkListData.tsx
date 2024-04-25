import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {type LinkType} from "../features/link/linkSlice";
import {deleteLink} from '../features/link/linkThunk';

interface LinkListDataProps {
    data: LinkType,
    editable: boolean,
    setIsEditing: Function
}

const LinkListData: React.FunctionComponent<LinkListDataProps> = ({data, editable, setIsEditing}) => {
    const dispatch = useDispatch<useDispatchType>();
    const {deleteLinkLoading} = useSelector((store: useSelectorType) => store.link);
    return (
        <>
            <div>{data.icon}</div>
            <div className='mt'>{data.title}</div>
            <button onClick={() => {
                window.open(data.link.startsWith('http') ? data.link : `https://${data.link}`, '_blank');
            }}>View</button>
            {editable && (
                <>
                    <button onClick={() => {
                        setIsEditing(true);
                    }}>Edit</button>
                    <button onClick={() => {
                        dispatch(deleteLink(data.id));
                    }} disabled={deleteLinkLoading}>{deleteLinkLoading ? 'Deleting' : 'Delete'}</button>
                </>
            )}
        </>
    );
}

export default LinkListData;