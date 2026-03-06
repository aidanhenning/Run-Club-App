import styles from "@/pages/PostDetails/PostDetails";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import Details from "@/components/Pages/PostDetails/Details/Details";
import RsvpList from "@/components/Pages/PostDetails/RsvpList/RsvpList";
import PhotoAlbum from "@/components/Pages/PostDetails/PhotoAlbum/PhotoAlbum";
import Comments from "@/components/Pages/PostDetails/Comments/Comments";

export default function PostDetails() {
  return (
    <div className={styles.container}>
      <Header title="" showBack={true} />

      <Details />
      <RsvpList />
      <PhotoAlbum />
      <Comments />

      <BottomNav />
    </div>
  );
}
