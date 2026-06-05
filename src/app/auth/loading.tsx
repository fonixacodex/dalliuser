"use client";

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4 transition-colors duration-300  dark bg-gray  ">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 min-h-150 flex flex-col justify-center transition-colors duration-300">
            

            <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4 animate-pulse"></div>
            

            <div className="h-8 w-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 animate-pulse"></div>
            <div className="h-4 w-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 animate-pulse"></div>
            

            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl mb-2 animate-pulse"></div>
            <div className="h-3 w-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>

            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            
          </div>
          <div className="hidden lg:block">
            <div className="h-150 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
}