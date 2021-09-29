import React, { useContext } from 'react'
import SignInForm from "../Components/SignInForm"
import './Landing.css'
import { UserContext } from "../Providers/UserProvider";

export default function Landing() {
const user = useContext(UserContext)
console.log(user)
    return (
        <div className="Landing">

            <section className="Landing-Item">
            <h1>EVENT( FUL )</h1>

                <p>
                The amateur event planner doesn't have much experience finding vendors, keeping track of their vendor budget,
                or monitoring what vendors they like and which ones they have and haven't booked.
                These essential aspects of planning an event are spread out across different platforms.
                For example, one might use Google or Yelp to find and connect with vendors.
                However, there are many necessities to consider (catering, music, photography, etc.) when planning a party,
                which can lead to multiple search queries. In order to keep track of all of their booked vendor's information
                (contact, cost, etc.), what vendors they have and have yet to book, as well as if they are still on budget,
                they may use a Microsoft excel spreadsheet. But, Excel does not create organized checklists tailored to your events.
                Instead, you are required to create tables and populate them with information yourself.
                While these separate entities are okay on their own, for an individual who struggles with multitasking,
                it would take resiliency on their part to stay organized.
                </p>

            </section>
            {/* <SignInForm /> */}

        </div>
    )
}