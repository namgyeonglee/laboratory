"use client";

import React, { useEffect, useState } from "react";
import defaultImage from "./default.png";
import Image from "next/image";

export default function ProfileImageUploader() {

  const [user, setUser] = useState<any>({});
  const getUserData = async () => {
    try {
      const response = await fetch("/api/proxy/user", { method: "GET" });
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [profileImage, setProfileImage] = useState<any>()
  // const handleProfileImage = (e: any) => {
  //   e.preventDefault();
  //   if (!e.target.files[0]) return setProfileImage(defaultImage);
    
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setProfileImage(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);

  //   console.log(profileImage);
  // }

  const handleProfileImage = async (e: any) => { 
    const file = e.target.files[0];
    if (!file) {
      setProfileImage(user.profileImageUrl);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }

    try {
      const response = await fetch("/api/proxy/user", {
        method: "POST",
        body: JSON.stringify({ profileImageUrl: reader.result }),
      });

      if (response.ok) {
        console.log('이거 뜨면 포스트 성공임 룰랄루라');

        // const reader = new FileReader();
        // reader.onload = () => {
        //   if (reader.readyState === 2) {
        //     setProfileImage(reader.result as string);
        //   }
        // };
        // reader.readAsDataURL(file);
      } else {
        console.error('업로드 실패:', response.status, response.statusText);
        }
    } catch (error) {
    console.error('업로드 중 오류 발생:', error);
    }
  }

  // const handleProfileImage = async (e: any) => {    
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   try {
  //     const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = (event) => resolve(event.target?.result as ArrayBuffer);
  //       reader.onerror = (error) => reject(error);
  //       reader.readAsArrayBuffer(file);
  //     });
  
  //     const base64String = btoa(
  //       String.fromCharCode.apply(null, new Uint8Array(arrayBuffer) as unknown as number[])
  //     );
  
  //     const response = await fetch("/api/proxy/user", {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ 
  //         profileImageUrl: {
  //           $binary: {
  //             base64: base64String,
  //           }
  //         }
  //       }),
  //     });
  
  //     if (response.ok) {
  //       console.log('이거 뜨면 포스트 성공임 룰랄루라');
        
  //       // 파일을 성공적으로 업로드한 후에 이미지 미리보기 설정
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setProfileImage(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       console.error('업로드 실패:', response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('업로드 중 오류 발생:', error);
  //   }
  // }
  
  // const postProfileImage = async () => {
  //   const response = await fetch("/api/proxy/user", {
  //     method: "POST",
  //     body: JSON.stringify({ profileImageUrl: profileImage }),
  //   });

  //   if (response.ok) {
  //     console.log('이거 뜨면 포스트 성공임 룰랄루라');
  //     // handleChange(profileImageUrl, profileImageUrl);
  //   }
  // }

  // useEffect(() => {
  //   postProfileImage();
  // }, profileImage);

  useEffect(() => {
    setProfileImage(user.profileImageUrl);
  }, user);

  const inputRef = React.createRef();
  const handleUploadProfileImage = (inputRef: any) => {
    inputRef.current?.click();
    console.log(inputRef);
    // 이거 동작이 안됨...... 
  } 

  return (
    <div>
      <div className="text-3xl text-white bg-green-300">
        {JSON.stringify(user)}
      </div>
      <Image src={profileImage ? profileImage : user?.profileImageUrl} alt="profile image" width="300" height="300" onClick={handleUploadProfileImage} />
      <input 
        type="file" 
        // style={{ display: "none" }} 
        accept="image/jpg, image/png, image/jpeg" 
        ref={inputRef} 
        onChange={handleProfileImage}
      />
    </div>
  );
}