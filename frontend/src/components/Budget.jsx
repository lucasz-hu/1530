import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Budget = () => {
    const [budget, setBudget] = useState();

    const getBudget = () => {
        fetch("/api/api/budget").then((response) => {
            response = response.json().then((data) => {
                console.log(data);
                setBudget(data);
            });
        });
    };

    const deleteBudget = (id) => {
        console.log(id);
        fetch(`/api/api/budget/${id}`, { method: "DELETE" }).then(
            (response) => {
                response = response.json().then((data) => {
                    console.log(data);
                    setBudget(budget.filter((bud) => bud._id != id));
                });
            }
        );
    };

    useEffect(() => {
        getBudget();
    }, []);

    return (
        <div className="bg-gray-900 h-screen w-screen">
            <Header />
            <div
                className="overflow-auto bg-white max-w-4xl mx-auto rounded-md p-4 sm:p-6 lg:p-8"
                style={{ maxHeight: 800 }}
            >
                {budget?.length === 0 ||
                    (budget === null && (
                        <div>
                            No Budget Found! Would you like to create one?
                        </div>
                    ))}
                {budget?.length > 0 && (
                    <>
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">
                                    Budgets
                                </h1>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() =>
                                        (window.location.href = "/newbudget")
                                    }
                                >
                                    Create a new budget
                                </button>
                            </div>
                        </div>
                        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                        >
                                            $/Month
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budget.map((bud, planIdx) => (
                                        <tr key={bud.id}>
                                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                {bud.title}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                                {bud.Amount}
                                            </td>
                                            <td className=" py-4 text-sm text-gray-500 lg:table-cell">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 text-red-600 bg-red-200 rounded-lg cursor-pointer"
                                                    onClick={() =>
                                                        deleteBudget(
                                                            bud._id
                                                            // bud.title,
                                                            // bud.Amount
                                                        )
                                                    }
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Budget;