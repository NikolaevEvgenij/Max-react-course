import {
   Link,
   useNavigate,
   useParams,
} from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import {
   useMutation,
   useQuery,
} from "@tanstack/react-query";
import {
   client,
   fetchEvent,
   updateEvent,
} from "../../utils/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
   const navigate = useNavigate();

   const { id } = useParams();

   const {
      data: inputData,
      isPending: eventIsPending,
      isError: eventIsError,
      error: eventError,
   } = useQuery({
      queryKey: [{ id: id }],
      queryFn: ({ signal }) =>
         fetchEvent({ signal, id: id }),
   });

   const { mutate } = useMutation({
      mutationFn: updateEvent,
      onMutate: async (data) => {
         const updatedEvent = data.event;
         await client.cancelQueries({
            queryKey: ["events", { id: id }],
         });
         const previousEventData = client.getQueryData([
            "events",
            { id: id },
         ]);
         client.setQueryData(
            ["events", { id: id }],
            updatedEvent
         );
         return { previousEventData };
      },
      onError: (error, data, context) => {
         client.setQueryData(
            ["events", { id: id }],
            context.previousEventData
         );
      },
      onSettled: () => {
         client.invalidateQueries(["events", { id: id }]);
      },
   });

   function handleSubmit(formData) {
      mutate({ id: id, event: formData });
      navigate("../");
   }

   function handleClose() {
      navigate("../");
   }

   return (
      <Modal onClose={handleClose}>
         {eventIsPending && (
            <div className='center'>
               <LoadingIndicator />
            </div>
         )}
         {eventIsError && (
            <ErrorBlock
               title={"Failed to fetch event information"}
               message={
                  eventError?.info?.message ||
                  "Please try again later"
               }
            />
         )}
         {(eventIsError || inputData) && (
            <EventForm
               inputData={inputData}
               onSubmit={handleSubmit}
            >
               <Link to='../' className='button-text'>
                  Cancel
               </Link>
               <button type='submit' className='button'>
                  Update
               </button>
            </EventForm>
         )}
      </Modal>
   );
}
