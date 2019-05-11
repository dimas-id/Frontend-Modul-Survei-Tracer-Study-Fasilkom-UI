import get from "lodash/get";
import { useState, useEffect } from "react";
import { store } from "../../../modules";
import { crmAction } from "../../../modules/crm";
import { selectContacts } from "../../../modules/crm/selectors";

export function useContactSearch(search = "", categories = []) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let ignore = false;

    (function fetchContact() {
      setLoading(true);
      store.dispatch(async (dispatch, _, { API }) => {
        try {
          const resp = await API.atlasV1.contact.getContactList(
            search,
            categories
          );
          if (!ignore) {
            await dispatch(crmAction.setContacts(get(resp, "data.results")));
          }
        } finally {
          setLoading(false);
        }
      });
    })();

    return () => {
      ignore = true;
    };
  }, [search, categories]);

  return [selectContacts(store.getState()), loading];
}
