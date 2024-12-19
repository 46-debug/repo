import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

const Details = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [show, setShow] = useState("none");
    const [redirectToPayment, setRedirectToPayment] = useState(false); // New state for redirection

    const [paxData, setpaxData] = useState({
        name: "",
        email: "",
        number: "",
        travelers: [],
        location: "",
        startDate: "",
        price: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpaxData({ ...paxData, [name]: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/form/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error("Error fetching details:", error);
                setItem(null);
            }
        };

        fetchData();
    }, [id]);

    if (item === null) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Error loading data. Please try again later.</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: paxData.name,
            email: paxData.email,
            number: paxData.number,
            travelers: paxData.travelers,
            location: item.title,
            startDate: item.availableDates,
            price: item.price,
        };

        try {
            const response = await fetch("http://localhost:5000/api/paxInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Form data submitted successfully!");
                setRedirectToPayment(true); // Set redirection state
            } else {
                console.error("Failed to submit form data");
                alert("Failed to submit the form.");
            }
        } catch (error) {
            console.error("Error submitting form data:", error);
            alert("An error occurred while submitting the form.");
        }
    };

    if (redirectToPayment) {
        return <Navigate to="/paymentpage" />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-2 relative">

            <div className="flex flex-col justify-center items-center h-screen w-screen fixed z-10 bg-white p-4 bg" style={{ display: show }}>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg bg-white overflow-hidden p-1">
                    <h2 className="text-2xl font-bold my-2 text-center text-gray-700">
                        Submit Your Details
                    </h2>
                    <label className="block mb-4">
                        <span className="text-gray-600">Name:</span>
                        <input
                            type="text"
                            name="name"
                            value={paxData.name}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your name"
                            required />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-600">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={paxData.email}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            required />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-600">Phone Number:</span>
                        <input
                            type="number"
                            name="number"
                            value={paxData.number}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your number"
                            required />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-600">Travelers:</span>
                        <input
                            type="number"
                            name="travelers"
                            value={paxData.travelers}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Number of travelers"
                            required />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-600">Location:</span>
                        <input
                            value={item.title}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled />
                    </label>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Submit
                    </button>
                </form>

                <button onClick={() => setShow("none")}>Back</button>
            </div>

            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                    <div className="flex flex-row overflow-auto">
                        {item.images.map((image, index) => (
                            <img key={index} src={image} alt={`Item ${index}`} className="mb-2 rounded" />
                        ))}
                    </div>
                </div>


                <div className="p-3">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Description:</strong> {item.description}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Price:</strong> ₹{item.price} /person
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Available Date:</strong> {new Date(item.availableDates).toLocaleDateString()}
                    </p>
                </div>

                <div className="p-6 border-t flex justify-end gap-4">
                    <button onClick={() => setShow("")}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400">Book Now
                    </button>
                    <Link to="/">
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:ring-2 focus:ring-gray-400">Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Details;

