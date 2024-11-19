import styles from '../../styles/showBlog.module.css';

// libraries for like,share,... icon
import { FaHeart, FaBookmark, FaEllipsisV } from 'react-icons/fa';
import { HeartIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/outline';
import { db } from '../../firebase/firebase';
import { doc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Loader from '../components/Loader';
import CommentsSection from '../comment_section';
import DOMPurify from 'dompurify';
import Image from 'next/image';

// can use this after like = {red heart}

// <button
// style={{ border: 'none', background: 'none', cursor: 'pointer' }}
// >
// <FaHeart size={24} color="red" />
// </button>


// can use this after save = {saved}

// <button
// style={{ border: 'white', background: 'black', cursor: 'pointer' }}
// >
// <FaBookmark size={24} />
// </button>


const showBlog = ({ blog,username,profileImage }) => {

    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hashtags, setHashtags] = useState([]);

    // Fetch the current user's ID
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setCurrentUser(user.uid); // Set current user's ID
        } else {
            setCurrentUser(null); // No user is logged in
        }
        });

        return () => unsubscribe();
    }, []);

    if (router.isFallback) {
        return <Loader />;
    }

    const name = 'name';
    const blogTitle = blog.title;
    const blogContent = blog.content;
    const likeCount = 0;
    const blogId = blog.id;

    const handleLike = () => {

    };

    const handleShare = () => {
    };

    const handleSave = () => {

    };

    const handleCommentSend = () => {

    };

    const handleDotBtn = () => {

    };
    
    const sanitizedContent = typeof window !== "undefined" ? DOMPurify.sanitize(blog.content) : blog.content;
    
    
    const handleDeleteBlog = async () => {
        console.log('handleDeleteBlog is called');
        if (!blogId) return; // Safety check
    
        try {
            const blogRef = doc(db, 'blogs', blogId);
            await deleteDoc(blogRef);
        
            // Clear the editor and reset the draft state
            setTitle('');
            setContent('');
            setHashtags([]);
            console.log("I'm here");
            router.push('/profile');
            alert('Blog deleted successfully!');
        } catch (error) {
            console.error('Error deleting blog:', error);
            setError('Failed to delete blog. Please try again.');
        
            // Clear the error after 3 seconds
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    return (
        <div className={styles.blogContainer}>

            {/* scrollable section */}
            <div className={styles.leftSection}>
                <div className={styles.blogSection}>
                    <h1 className={styles.blogTitle}
                dangerouslySetInnerHTML={{
                    __html: blog.title, // Assume content is HTML stored in the database
                }}
                    />
                    <div
                className="ql-editor"
                dangerouslySetInnerHTML={{
                    __html: blog.content, // Assume content is HTML stored in the database
                }}
            />


                    {/* Render hashtags */}
                        {blog.hashtags && blog.hashtags.length > 0 && (
                        <div className="mt-5">
                            {blog.hashtags.map((tag, index) => (
                                <span key={index} className="bg-gray-200 text-gray-800 px-4 py-2 mt-2 rounded-full text-sm font-semibold">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {currentUser === blog.userId && (
                        <button onClick={() => router.push(`/blog_write?blogId=${blog.id}`)}
                        className="px-4 py-2 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-transparent"
                        style={{ backgroundColor: '#28a745',marginRight: 15,marginTop: 12}}
                        >
                            Edit blog
                        </button>
                    )}

                    {currentUser === blog.userId && (<button
                        type="button"
                        onClick={handleDeleteBlog}
                        className="px-4 py-2 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-transparent"
                        style={{ backgroundColor: '#dc3545' }} // Red color for the "Delete Draft" button
                        >
                            Delete Blog
                        </button>
                    )}

                </div>
            </div>


            {/* Static Section */}
            <div className={styles.rightSection}>
                <div className={styles.aboutBlog}>

                    <div className={styles.authorInfo}>
                    {profileImage
                     ? (
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                        <Image
                            src={profileImage}  // URL of the profile picture
                            alt="Author's Avatar"
                            layout="fill"  // Scales to fill the parent container
                            objectFit="cover"  // Maintains aspect ratio while filling
                        />
                    </div>
                    
                  
                ) : (
                    <span></span>  // Fallback if profile picture is not available
                )}
                        <div className={styles.authorDetails}>
                            <p>@{username}</p>
                        </div>
                        <div className={styles.btnSection}>
                            <button className={styles.followBtn}>
                                Follow
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className={styles.commentsSection}>
                        <CommentsSection blogId={blog.id} />
                    </div>

                    {/* Blog Footer like share save other option */}
                    <div className={styles.likeSave}>
                        {/* Like icon */}
                        <button
                            // className="p-2 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-gray-600"
                            aria-label="Like"
                            onClick={handleLike}
                        >
                            <HeartIcon className="h-9 w-9 text-white" />
                        </button>

                        {/* count a blogLike */}
                        <p>{likeCount} likes</p>

                        {/* Share icon */}
                        <button
                            // className="p-2 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-gray-600"
                            aria-label="Share"
                            onClick={handleShare}
                        >
                            <ShareIcon className="h-8 w-8 text-white" />
                        </button>

                        {/* Save icon */}
                        <button
                            // className="p-2 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-gray-600"
                            aria-label="Bookmark"
                            onClick={handleSave}
                        >
                            <BookmarkIcon className="h-8 w-8 text-white" />
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

    export async function getStaticPaths() {
        // Fetch all blog IDs from Firestore
        const blogsSnapshot = await getDocs(collection(db, "blogs"));
        const paths = blogsSnapshot.docs.map((doc) => ({
        params: { id: doc.id },
        }));
    
        return {
        paths,
        fallback: true, // Enable fallback for dynamic generation
        };
    }

    export async function getStaticProps({ params }) {
        // Fetch the blog document from Firestore
        const docRef = doc(db, "blogs", params.id);
        const docSnap = await getDoc(docRef);
    
        if (!docSnap.exists()) {
            return {
                notFound: true, // Show a 404 page if the blog doesn't exist
            };
        }
    
        const blogData = docSnap.data();
        
        // Fetch user details using the userId from the blog data
        const userRef = doc(db, 'users', blogData.userId);  // Get the user document by userId
        const userSnapshot = await getDoc(userRef);
        
        let username = '';
        let profileImage = ''; // Declare a variable to hold the author's profile image
        if (userSnapshot.exists()) {
            username = userSnapshot.data().username;  // Get the username from the user document
            profileImage = userSnapshot.data().profileImage || ''; // Get the author's profile image URL
        }
    
        // Convert the Firestore timestamp to a string
        const blog = {
            id: params.id,
            ...blogData,
            timestamp: blogData.timestamp ? blogData.timestamp.toDate().toISOString() : null,
        };
    
        return {
            props: {
                blog,
                username,
                profileImage, // Pass the profileImage to the component
            },
            revalidate: 10, // Revalidate at most every 10 seconds
        };
    }
    

export default showBlog;