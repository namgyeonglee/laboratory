import ProfileImageUploader from "@/components/sample/ProfileImageUploader";
import SamplePost from "@/components/sample/SamplePost";
import UserGetButton from "@/components/sample/UserGetButton";

export default function page() {
  return (
    <>
      <SamplePost />
      <UserGetButton />
      <ProfileImageUploader />
    </>
  );
}
