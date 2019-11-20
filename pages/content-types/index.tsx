import React from "react";
import Link from "next/link";
import { useContentTypes } from "../../hooks";

export default function ContentTypes() {
  const { contentTypes } = useContentTypes();

  console.log(contentTypes);

  return (
    <div>
      <h1>Content Types</h1>

      <Link href={`/content-types/new`}>
        <a>New Content Type</a>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(contentTypes).map((collectionItemId: string) => {
            return (
              <tr key={collectionItemId}>
                <td>
                  <Link href={`/content-types/${collectionItemId}`}>
                    <a>
                      {contentTypes[collectionItemId].name ? (
                        contentTypes[collectionItemId].name
                      ) : (
                        <em>{collectionItemId}</em>
                      )}
                    </a>
                  </Link>
                </td>
                <td>{collectionItemId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
