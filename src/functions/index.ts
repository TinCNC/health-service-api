import { ObjectId } from "bson";

export const generateObjectIdForSubdocumentList = (data: any[]): void => {
  let oldIds: ObjectId[] = [];
  data.map((item) => {
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
  //   return new ObjectId();
};
