const initialState = {
  // Async requests status
  getSharedFlatListPending: false,
  getSharedFlatListError: null,
  makeJoinRequestPending: false,
  makeJoinRequestError: null,
  createSharedFlatPending: false,
  createSharedFlatError: null,
  getDetailPending: false,
  getDetailError: null,
  getEventsPending: false,
  getEventsError: null,
  getJoinRequestsPending: false,
  getJoinRequestsError: null,
  draftMode: false, // Toggle the event draft mode in the view
  list: undefined, // Complete list of joinable Shared Flat
  filteredList: undefined, // Filtered list of joinable Shared Flat
  activeTabIndex: 0, // Dashboard list tab
  data: null, // Shared flat details
  searchQuery: undefined, // search query in shared flat list
  files: [], // files uploaded for create shared flat page
  events: [], // Shared flat event list
  joinRequests: [], // Join requests list
  // actions displayed in the notify action tab
  actions: [
    {
      title: "create event",
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/OpHiXAcYzmPQHcdlLFrc.png",
    },
    {
      title: "create need event",
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/wvEzCMiDZjthhAOcwTOu.png",
    },
    {
      title: "create expense event",
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png",
    },
  ],
  postDraftPending: false,
  postDraftError: null,
  publishDraftPending: false,
  publishDraftError: null,
};

export default initialState;
