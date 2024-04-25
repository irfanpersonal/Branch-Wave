import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {editLink} from '../features/link/linkThunk';
import {type LinkType} from '../features/link/linkSlice';
import {icons} from '../utils';

interface EditLinkProps {
    data: LinkType,
    setIsEditing: Function
}

const EditLink: React.FunctionComponent<EditLinkProps> = ({data, setIsEditing}) => {
    const dispatch = useDispatch<useDispatchType>();
    const {editLinkLoading} = useSelector((store: useSelectorType) => store.link);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const formData = new FormData();
        formData.append('icon', (target.elements.namedItem('icon') as HTMLSelectElement).value);
        formData.append('title', (target.elements.namedItem('title') as HTMLInputElement).value);
        formData.append('link', (target.elements.namedItem('link') as HTMLInputElement).value);
        dispatch(editLink({data: formData, linkID: data.id}));
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='icon'>Icon</label>
                <select id="icon" name="icon" defaultValue={data.icon} required>
                    <option value=""></option>
                    {icons.map((icon: string) => {
                        return (
                            <option key={icon} value={icon}>{icon}</option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label htmlFor='title'>Title</label>
                <input id="title" type="text" name="title" defaultValue={data.title} required/>
            </div>
            <div>
                <label htmlFor='link'>Link</label>
                <input id="link" type="url" name="link" defaultValue={data.link} required/>
            </div>
            <button type="button" onClick={() => {
                setIsEditing(false);
            }}>Cancel</button>
            <button type="submit" disabled={editLinkLoading}>{editLinkLoading ? 'Updating' : 'Update'}</button>
        </form>
    );
}

export default EditLink;