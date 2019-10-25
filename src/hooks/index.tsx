import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ContentType } from "../types";

type Posts = {
  [key: string]: {
    [key: string]: any;
  };
};

export function usePosts(contentTypeId: string) {
  const [posts, setPosts] = useState<Posts>({});

  useEffect(() => {
    let ignore = false;

    async function getPosts() {
      const firebasePosts: Posts = {};
      try {
        const response = await firebase
          .firestore()
          .collection(`/posts/${posts}`)
          .get();

        response.forEach(doc => {
          firebasePosts[doc.id] = doc.data();
        });
      } catch (e) {
      } finally {
        if (!ignore) setPosts(firebasePosts);
      }
    }

    getPosts();

    return () => {
      ignore = true;
    };
  }, [contentTypeId]);
}

export function useContentTypes() {
  const [contentTypes, setContentTypes] = useState<ContentType>({});

  useEffect(() => {
    let ignore = false;

    async function getContentTypes() {
      const firebaseContentTypes: { [key: string]: ContentType } = {};
      try {
        const response = await firebase
          .firestore()
          .collection(`/content-types`)
          .get();

        response.forEach(doc => {
          firebaseContentTypes[doc.id] = doc.data() as ContentType;
        });
      } catch (e) {
      } finally {
        if (!ignore) setContentTypes(firebaseContentTypes);
      }
    }

    getContentTypes();

    return () => {
      ignore = true;
    };
  }, []);

  return contentTypes;
}

// type UseFirebaseCollectionConfig = {
//   collectionName: string;
//   fieldPath?: string | firebase.firestore.FieldPath;
//   opStr?: firebase.firestore.WhereFilterOp;
//   value?: any;
// };

// export function useFirebaseDocument(documentId: string) {
//   const [hasLoaded, setHasLoaded] = useState(false);
//   const [] = useState(false);
//   const [contentType, setContentType] = useState<ContentType | undefined>();
//   const [hasError, setHasError] = useState(false);

//   // firebase
//   //   .firestore()
//   //   .collection("content-types")
//   //   .doc(name)
//   //   .get();
// }

// export function useContentTypePosts(contentTypeId: string) {
//   return useFirebaseCollection({
//     collectionName: "posts",
//     fieldPath: "contentType",
//     opStr: "==",
//     value: contentTypeId
//   });
// }

// export function useFirebaseCollection(props: UseFirebaseCollectionConfig) {
//   const { collectionName, fieldPath, opStr, value } = props;
//   const [loaded, setLoaded] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const [collectionItems, setCollectionItems] = useState<{
//     [key: string]: any;
//   }>({});

//   useEffect(() => {
//     let cancelled = false;

//     async function fetchCollection() {
//       try {
//         let querySnapshotPromise = firebase
//           .firestore()
//           .collection(collectionName);

//         if (
//           fieldPath !== undefined &&
//           opStr !== undefined &&
//           value !== undefined
//         ) {
//           querySnapshotPromise.where(fieldPath, opStr, value);
//         }

//         const t = querySnapshotPromise.get();

//         const result = await t;
//         const newCOllectionItems: { [key: string]: any } = {};

//         result.forEach(item => {
//           const tempItem: any = {
//             ...item.data()
//           };
//           newCOllectionItems[item.id] = tempItem;
//         });
//         if (!cancelled) {
//           setCollectionItems(newCOllectionItems);
//           setLoaded(true);
//         }
//       } catch (e) {
//         if (!cancelled) {
//           setHasError(true);
//           setLoaded(true);
//         }
//       }
//     }

//     fetchCollection();

//     return function cleanup() {
//       cancelled = true;
//     };
//   }, []);

//   return {
//     loaded,
//     hasError,
//     collectionItems
//   };
// }

// export function useFirebaseSetDocument(collectionName: string) {
//   const setPost = useCallback(
//     async function setPost(
//       values: { [key: string]: any },
//       id: string = firebase
//         .firestore()
//         .collection(collectionName)
//         .doc().id
//     ) {
//       await firebase
//         .firestore()
//         .collection(collectionName)
//         .doc(id)
//         .set(values);
//     },
//     [collectionName]
//   );

//   return {
//     setPost
//   };
// }
