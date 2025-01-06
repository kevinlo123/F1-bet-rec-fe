import FooterOne from "../common/elements/footer/FooterOne";
import HeaderFour from "../common/elements/header/HeaderFour";
import { getAllPosts } from '../../lib/api';
import HeadTitle from "../common/elements/head/HeadTitle";
import React, {  useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ProtectedRoute from '../common/utils/ProtectedRoute';


const CreatePost = ({ allPosts }) => {
    const [title, setTitle] = useState('');
    const [selectedFeaturedImg, setSelectedFeaturedImg] = useState(null);
    const [selectedCate, setSelectedCate] = useState('Category');
    const [selectedTime, setSelectedTime] = useState('Read Time');
    const [contentTop, setContentTop] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const local = 'http://localhost:3000/api/v1/posts';
    const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1/posts';
    const apiUrl = window.location.hostname === 'localhost' ? local : prod;
    const router = useRouter();

    const tags = [
        { id: 'tag-monaco-gp', label: 'Monaco GP' },
        { id: 'tag-silverstone-gp', label: 'Silverstone GP' },
        { id: 'tag-canada-gp', label: 'Canada GP' },
        { id: 'tag-mercedes', label: 'Mercedes' },
        { id: 'tag-red-bull-racing', label: 'Red Bull Racing' },
        { id: 'tag-ferrari', label: 'Ferrari' },
        { id: 'tag-mclaren', label: 'McLaren' },
        { id: 'tag-alpine', label: 'Alpine' },
        { id: 'tag-aston-martin', label: 'Aston Martin' },
        { id: 'tag-williams', label: 'Williams' },
        { id: 'tag-alpha-romeo', label: 'Stake F1 Team' },
        { id: 'tag-haas', label: 'Haas' },
        { id: 'tag-alfa-tauri', label: 'Visa Cashapp RB' },
        { id: 'tag-lewis-hamilton', label: 'Lewis Hamilton' },
        { id: 'tag-charles-leclerc', label: 'Charles Leclerc' },
        { id: 'tag-max-verstappen', label: 'Max Verstappen' },
        { id: 'tag-liam-lawson', label: 'Liam Lawson' },
        { id: 'tag-lando-norris', label: 'Lando Norris' },
        { id: 'tag-oscar-piastri', label: 'Oscar Piastri' },
        { id: 'tag-george-russell', label: 'George Russell' },
        { id: 'tag-kimi-antonelli', label: 'Kimi Antonelli' },
        { id: 'tag-pierre-gasly', label: 'Pierre Gasly' },
        { id: 'tag-jack-doohan', label: 'Jack Doohan' },
        { id: 'tag-fernando-alonso', label: 'Fernando Alonso' },
        { id: 'tag-lance-stroll', label: 'Lance Stroll' },
        { id: 'tag-yuki-tsunoda', label: 'Yuki Tsunoda' },
        { id: 'tag-isaac-hadjar', label: 'Isaac Hadjar' },
        { id: 'tag-oliver-bearman', label: 'Oliver Bearman' },
        { id: 'tag-esteban-ocon', label: 'Esteban Ocon' },
        { id: 'tag-alex-albon', label: 'Alex Albon' },
        { id: 'tag-carlos-sainz', label: 'Carlos Sainz' },
        { id: 'tag-nico-hulkenburg', label: 'Nico Hulkenburg' },
        { id: 'tag-gabriel-bortoleto', label: 'Gabriel Bortoleto' },
        { id: 'tag-rumors', label: 'Rumors' },
        { id: 'tag-breaking-news', label: 'Breaking News' },
        { id: 'tag-race-results', label: 'Race Results' },
        { id: 'tag-fastest-lap', label: 'Fastest Lap' },
        { id: 'tag-pole-position', label: 'Pole Position' },
        { id: 'tag-qualifying-results', label: 'Qualifying Results' },
        { id: 'tag-driver-announcement', label: 'Driver Announcement' },
        { id: 'tag-team-update', label: 'Team Update' },
        { id: 'tag-aerodynamics', label: 'Aerodynamics' },
        { id: 'tag-fuel-strategy', label: 'Fuel Strategy' },
        { id: 'tag-tyre-management', label: 'Tyre Management' },
        { id: 'tag-f1-merch', label: 'F1 Merch' },
        { id: 'tag-fan-stories', label: 'Fan Stories' },
        { id: 'tag-f1-history', label: 'F1 History' },
        { id: 'tag-f1-culture', label: 'F1 Culture' }
    ];

    const categories = [
        { cate: "News and Updates" },
        { cate: "Races and Events" },
        { cate: "Lifestyle and Culture" },
        { cate: "Beyond the Grid" },
        { cate: "History and Legacy" }
    ];

    const times = [
        { time: "1 min. read" },
        { time: "3 min. read" },
        { time: "5 min. read" },
        { time: "7 min. read" },
        { time: "10 min. read" }
    ];

    const handleTagChange = (id) => {
        setSelectedTags((prev) =>
            prev.includes(id) ? prev.filter(tag => tag !== id) : [...prev, id]
        );
    };

    const handleFileChange = (event) => {
        setSelectedFeaturedImg(event.target.files[0]);
    };

    const handleCateSelect = (cate) => {
        setSelectedCate(cate.cate);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time.time);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post[title]', title);
        formData.append('post[cate]', selectedCate);
        formData.append('post[read_time]', selectedTime);
        formData.append('post[top_content]', contentTop);
        formData.append('post[tags]', selectedTags.join(', '));

        if (selectedFeaturedImg) {
            formData.append('post[feature_img]', selectedFeaturedImg);
        }
        // console.log(title);
        // console.log(selectedCate);
        // console.log(contentTop);
        // console.log(selectedTags);
        // console.log(selectedTime);
        // console.log(formData);
        console.log('Selected Tags:', selectedTags);
        console.log([...formData.entries()]);

            // Log formData to verify the content
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`${data.message}`);
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } else {
                const errorMessage = await response.json();
                console.error('Error creating post:', errorMessage);
                toast.error(`${errorMessage.error}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('Network error');
        }
    };

    return (
        <ProtectedRoute requireAdmin={true}>
            <HeadTitle pageTitle="Create a post" />
            <HeaderFour postData={allPosts} />
            <div className="axil-section-gap edit-profile create-post">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Create a post</h1>
                        </div>
                        <form className="profile-edit-form" onSubmit={handleSubmit}>
                            <div className="form-group-img-upload">
                                <span>Upload a feature Image:</span>
                                <input
                                    type="file"
                                    className="profile-edit-image"
                                    id="featureImg"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="create-post__dropdowns">
                                <div className="mr--25">
                                    <label>Category:</label>
                                    <DropdownButton id="dropdown-basic-button" title={selectedCate}>
                                        <ul className="list-unstyled">
                                            {categories.map((cate, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleCateSelect(cate)}>
                                                    {cate.cate}
                                                </Dropdown.Item>
                                            ))}
                                        </ul>
                                    </DropdownButton>
                                </div>
                                <div>
                                    <label>Read Time:</label>
                                    <DropdownButton id="dropdown-basic-button" title={selectedTime}>
                                        <ul className="list-unstyled">
                                            {times.map((time, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleTimeSelect(time)}>
                                                    {time.time}
                                                </Dropdown.Item>
                                            ))}
                                        </ul>
                                    </DropdownButton>
                                </div>
                            </div>
                            <div>
                                <label>Post title:</label>
                                <div className="form-group">
                                    <span className="search-button">
                                        <i className="fal fa-pencil" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Post title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="axil-login form-group">
                                <div className="group-lta">
                                    <label>Post content top:</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Content Top"
                                        onChange={(e) => setContentTop(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="form-group-img-upload mt--30">
                                <span>Upload a content Image: (optional)</span>
                                <input
                                    type="file"
                                    className="profile-edit-image"
                                    id="featureImg"
                                    accept="image/*"
                                />
                            </div>
                            <div className="axil-login form-group">
                                <div className="group-lta">
                                    <label>Post content bottom: (optional)</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Content Top"
                                    // value={bio === '\n' || bio === null || bio === 'null' ? '' : bio}
                                    // onChange={(e) => setBio(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <span style={{ display: 'block', marginTop: '28px' }}>Tags:</span>
                                {tags.map(tag => (
                                    <React.Fragment key={tag.id}>
                                        <input
                                            id={tag.id}
                                            name="tags[]"  // Ensure this is tags[]
                                            type="checkbox"
                                            checked={selectedTags.includes(tag.label)}
                                            onChange={() => handleTagChange(tag.label)}
                                        />
                                        <label htmlFor={tag.id}>{tag.label}</label>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="edit-info-button-cont form-group">
                                <button type="submit" className="axil-button button-rounded hover-flip-item-wrapper">
                                    <span className="hover-flip-item">
                                        <span data-text="Save">Save</span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterOne />
        </ProtectedRoute>
    );
}

export default CreatePost;

export async function getStaticProps() {
    const allPosts = getAllPosts([
        'id',
        'title',
        'featureImg',
        'postFormat',
        'featured',
        'slidePost',
        'date',
        'slug',
        'cate',
        'pCate',
        'cate_img',
        'author_img',
        'author_name',
        'post_views',
        'read_time',
        'author_social',
    ]);

    return {
        props: { allPosts }
    }
}
