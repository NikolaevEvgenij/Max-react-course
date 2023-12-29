import {
   Link,
   Outlet,
   useNavigate,
   useParams,
} from "react-router-dom";

import Header from "../Header.jsx";
import {
   useMutation,
   useQuery,
} from "@tanstack/react-query";
import {
   client,
   deleteEvent,
   fetchEvent,
} from "../../utils/http.js";
import { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
   const [openDeleteModal, setOpenDeleteModal] =
      useState(false);

   const { id } = useParams();

   const navigate = useNavigate();

   const {
      data: event,
      isPending: eventIsPending,
      isError: eventIsError,
      error: eventError,
   } = useQuery({
      queryKey: ["events", { id: id }],
      queryFn: ({ signal }) =>
         fetchEvent({ signal, id: id }),
   });

   const {
      mutate,
      isPending: deleteIsPending,
      isError: deleteIsError,
      error: deleteError,
   } = useMutation({
      mutationFn: deleteEvent,
      onSuccess: () => {
         navigate("/events");
         client.invalidateQueries({
            queryKey: ["events"],
            refetchType: "none",
         });
      },
   });

   const handleDelete = () => {
      mutate({ id: id });
   };
   return (
      <>
         {openDeleteModal && (
            <Modal
               onClose={() => setOpenDeleteModal(false)}
            >
               <h2>Are you sure?</h2>
               <p>This action can not be undone.</p>
               <div className='form-actions'>
                  {deleteIsPending && <LoadingIndicator />}
                  <button
                     className='button-text'
                     onClick={() =>
                        setOpenDeleteModal(false)
                     }
                  >
                     Cancel
                  </button>
                  <button
                     className='button'
                     onClick={handleDelete}
                  >
                     Delete
                  </button>
                  {deleteIsError && (
                     <ErrorBlock
                        title={"Failed to delete event!"}
                        message={
                           deleteError?.info.message ||
                           "Error!"
                        }
                     />
                  )}
               </div>
            </Modal>
         )}
         <Outlet />
         <Header>
            <Link to='/events' className='nav-item'>
               View all Events
            </Link>
         </Header>
         <article id='event-details'>
            {eventIsPending && (
               <div
                  style={{
                     position: "absolute",
                     left: "46%",
                  }}
               >
                  <LoadingIndicator />
               </div>
            )}
            {eventIsError && (
               <ErrorBlock
                  title={"Failed to load event!"}
                  message={
                     eventError?.info.message || "Error!"
                  }
               />
            )}
            {event && (
               <>
                  <header>
                     <h1>{event.title}</h1>

                     <nav>
                        <button
                           onClick={() =>
                              setOpenDeleteModal(true)
                           }
                        >
                           Delete
                        </button>
                        <Link to='edit'>Edit</Link>
                     </nav>
                  </header>

                  <div id='event-details-content'>
                     <img
                        src={`http://localhost:3000/${event.image}`}
                        alt=''
                     />
                     <div id='event-details-info'>
                        <div>
                           <p id='event-details-location'>
                              {event.location}
                           </p>
                           <time
                              dateTime={`Todo-DateT$Todo-Time`}
                           >
                              {`${event.date} at ${event.time}`}
                           </time>
                        </div>
                        <p id='event-details-description'>
                           {event.descritpion}
                        </p>
                     </div>
                  </div>
               </>
            )}
         </article>
      </>
   );
}
