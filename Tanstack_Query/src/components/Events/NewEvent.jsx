import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import {
   client,
   createNewEvent,
} from "../../utils/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
   const navigate = useNavigate();

   const { mutate, isPending, isError, error } =
      useMutation({
         mutationFn: createNewEvent,
         onSuccess: () => {
            navigate("/events");
            client.invalidateQueries({
               queryKey: ["events"],
            });
         },
      });
   const handleSubmit = (formData) => {
      mutate({ event: formData });
   };

   return (
      <Modal onClose={() => navigate("../")}>
         <EventForm onSubmit={handleSubmit}>
            {isPending ? (
               "Submitting..."
            ) : (
               <>
                  <Link to='../' className='button-text'>
                     Cancel
                  </Link>
                  <button type='submit' className='button'>
                     Create
                  </button>
               </>
            )}
         </EventForm>
         {isError && (
            <ErrorBlock
               title={"Failed to submit event!"}
               message={error.info?.message}
            />
         )}
      </Modal>
   );
}
