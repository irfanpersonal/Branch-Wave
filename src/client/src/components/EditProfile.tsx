import styled from 'styled-components';
import moment from 'moment';
import {UserType} from "../features/user/userSlice";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import {countries} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {editProfile} from '../features/user/userThunk';

interface EditProfileProps {
    data: UserType,
    setIsEditing: Function
}

const EditProfile: React.FunctionComponent<EditProfileProps> = ({data, setIsEditing}) => {
    const dispatch = useDispatch<useDispatchType>();
    const {editProfileLoading} = useSelector((store: useSelectorType) => store.user);
    return (
        <Wrapper>
            <p><span>Name:</span><input id="name" defaultValue={data!.name} required/></p>
            <p><span>Email:</span><input id="email" defaultValue={data!.email} required/></p>
            <p>
                <span>Country:</span>
                <select name="country" id="country" defaultValue={data!.country} required>
                    <option value=""></option>
                    {countries.map((country: string) => {
                        return (
                            <option key={country} value={country}>{country}</option>
                        );
                    })}
                </select>
            </p>
            <p className="bio-box"><span>Bio:</span><textarea id="bio" defaultValue={data!.bio}></textarea></p>
            <p><span>Joined:</span>{moment(data!.createdAt).format('MMMM Do YYYY')}</p>
            <button onClick={() => {
                // Handle Edit
                const formData = new FormData();
                const nameValue = (document.querySelector('#name') as HTMLInputElement).value;
                const emailValue = (document.querySelector('#email') as HTMLInputElement).value;
                const countryValue = (document.querySelector('#country') as HTMLSelectElement).value;
                const bioValue = (document.querySelector('#bio') as HTMLTextAreaElement).value;
                formData.append('name', nameValue);
                formData.append('email', emailValue);
                formData.append('country', countryValue);
                formData.append('bio', bioValue);
                dispatch(editProfile(formData));
            }} disabled={editProfileLoading}>{editProfileLoading ? 'Editing' : <FaCheckCircle/>}</button>
            <button onClick={() => {
                setIsEditing(false);
            }}><div><FaTimesCircle/></div></button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    input, textarea {
        padding: 0.25rem;
    }
    .bio-box {
        display: flex;
        textarea {
            width: 100%;
            resize: none;
        }
    }
    button {
        margin-right: 1rem;
        font-size: 1.25rem;
        padding: 0 0.5rem;
    }
`;  

export default EditProfile;