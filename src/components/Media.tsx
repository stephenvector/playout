import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import Loading from "./Loading";

type MediaItem = {
  url: string;
  contentType: string;
};

export default function Media() {
  const [loaded, setLoaded] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    let ignore = false;

    firebase
      .storage()
      .ref("/")
      .listAll()
      .then(async result => {
        console.log(result);
        const mediaItemsPromises: Promise<MediaItem>[] = [];
        for (let item of result.items) {
          try {
            const mediaItem: Promise<MediaItem> = Promise.all([
              item.getDownloadURL(),
              item.getMetadata()
            ]).then(([url, metadata]) => {
              return {
                url,
                contentType: metadata.contentType
              };
            });

            mediaItemsPromises.push(mediaItem);
          } catch (e) {
            console.log(e);
          }
        }

        const mediaItems: MediaItem[] = await Promise.all(mediaItemsPromises);

        if (!ignore) {
          setMediaItems(mediaItems);
          setLoaded(true);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <h1>Media</h1>
      {!loaded && <Loading />}
      {loaded &&
        mediaItems.map(mediaItem => (
          <img
            key={mediaItem.url}
            style={{
              maxHeight: "100px",
              margin: "1rem",
              display: "inline-block"
            }}
            src={mediaItem.url}
          />
        ))}
    </div>
  );
}
