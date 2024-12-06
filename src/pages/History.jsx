import React from "react";

const History = () => {
  const recentlySearchedData = JSON.parse(
    localStorage.getItem("recently-searched-data")
  );

  return (
    <div className="container py-5">
      {/* Page title */}
      <h1 className="font-bold text-lg mb-1.5">Tarix</h1>

      {/* Page Description */}
      <p className="text-neutral-400 mb-5">
        Bu yerda oxirgi qidirilgan ma'lumotlar saqlanadi.
      </p>

      <b className="inline-block mb-3.5">
        <span className="font-medium">Ma'lumotlar </span>
        <span className="text-neutral-400 font-light">
          ({recentlySearchedData?.length || 0})
        </span>
      </b>

      {/* Data */}
      {recentlySearchedData && recentlySearchedData?.length > 0 && (
        <ul className="space-y-3.5">
          {recentlySearchedData.map((data, index) => {
            const { date, time } = data;
            const dataHeaders = Object.keys(data.data);

            return (
              <li key={index} className="bg-white p-3.5 space-y-2 rounded-xl">
                {/* Details */}
                <ul className="space-y-2.5">
                  {dataHeaders.map((title, index) => {
                    return (
                      <li key={index}>
                        <h3 className="inline-block font-medium">{title}:</h3>
                        <span className="text-neutral-500">
                          {" "}
                          {data.data[title]}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Date & Time  */}
                <div className="flex items-center justify-end gap-1.5 text-neutral-400">
                  <span className="text-sm">{date}</span>
                  <span className="text-sm">{time}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default History;
