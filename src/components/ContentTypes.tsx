import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ContentType } from "../types";

type CollectionItems<T> = {
  [key: string]: T;
};

function CollectionList<T>() {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [collectionItems, setCollectionItems] = useState<CollectionItems<T>>(
    {}
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchCollection() {
      try {
        let querySnapshotPromise = firebase
          .firestore()
          .collection("content-types")
          .get();
        const result = await querySnapshotPromise;
        const collectionItems: { [key: string]: T } = {};
        result.forEach(item => {
          collectionItems[item.id] = item.data() as T;
        });
        if (!cancelled) {
          setCollectionItems(collectionItems);
          setLoaded(true);
        }
      } catch (e) {
        if (!cancelled) {
          setHasError(true);
          setLoaded(true);
        }
      }
    }

    const fetchPromise = fetchCollection();

    return function cleanup() {
      cancelled = true;
    };
  }, []);

  if (!loaded) {
    return <div>Loading</div>;
  }

  if (hasError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      <h1>Content Types</h1>
      <pre>
        <code>{JSON.stringify(collectionItems, null, 2)}</code>
      </pre>
    </div>
  );
}

export default function ContentTypes() {
  return <CollectionList<ContentType> />;
}
