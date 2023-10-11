import { ObjectId } from "bson";

export const generateObjectIdForSubdocumentList = (
  data: any[],
  recursive: boolean = false
): void => {
  let oldIds: ObjectId[] = [];
  data.map((item) => {
    if (recursive) {
      item.forEach((element: unknown) => {
        if (Array.isArray(element)) {
          generateObjectIdForSubdocumentList(element);
        }
      });
    }
    let newId: ObjectId = new ObjectId(item.id);
    let idConflict = false;
    do {
      if (newId.equals(null) || newId.equals(undefined) || newId === undefined)
        newId = new ObjectId();
      oldIds.forEach((oldId) => {
        if (oldId.equals(newId)) {
          idConflict = true;
          return;
        }
      });
    } while (idConflict);
    oldIds.push(newId);
    item.id = newId;
    item.created_at = new Date();
    item.updated_at = new Date();
  });
};
