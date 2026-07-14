// import { useMemo, useState, useRef, useEffect } from "react";
// import { 
//   FaPaperPlane, 
//   FaEnvelope, 
//   FaFileAlt, 
//   FaExclamationCircle,
//   FaCog,
//   FaTimes,
//   FaSave,
//   FaEye,
//   FaEyeSlash
// } from "react-icons/fa";
// import MainLayout from "../../layouts/MainLayout";
// import PageHeader from "../../components/common/PageHeader";
// import { emailService } from "../../services/emailService";
// import { templateService } from "../../services/templateService";
// import { authService } from "../../services/authService";

// export default function EmailSender() {
//   const [fromEmail, setFromEmail] = useState("support@company.com");
//   const [ccEmail, setCcEmail] = useState("");
//   const [selectedTemplates, setSelectedTemplates] = useState([]);
//   const [recipients, setRecipients] = useState("");
//   const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [emailErrors, setEmailErrors] = useState([]);
  
//   // Config Popup States
//   const [isConfigOpen, setIsConfigOpen] = useState(false);
//   const [appPassword, setAppPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isPasswordLoading, setIsPasswordLoading] = useState(false);
//   const [passwordError, setPasswordError] = useState(null);
//   const [passwordSuccess, setPasswordSuccess] = useState(null);
//   const [hasExistingPassword, setHasExistingPassword] = useState(false);
  
//   // State for templates from API
//   const [templates, setTemplates] = useState([]);
//   const [isTemplatesLoading, setIsTemplatesLoading] = useState(true);
//   const [templatesError, setTemplatesError] = useState(null);
  
//   // Ref for dropdown container
//   const dropdownRef = useRef(null);
//   const configModalRef = useRef(null);

//   // Fetch templates from API on component mount
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         setIsTemplatesLoading(true);
//         setTemplatesError(null);
        
//         const response = await templateService.dropdown1();
        
//         if (response.data.hasError) {
//           setTemplatesError(response.msg[0] || 'Failed to load templates');
//           setTemplates([]);
//         } else {
//           setTemplates(response.data || []);
//         }
//       } catch (error) {
//         console.error('Error fetching templates:', error);
//         setTemplatesError('Failed to load templates. Please refresh the page.');
//         setTemplates([]);
//       } finally {
//         setIsTemplatesLoading(false);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   // Close config modal on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // if (configModalRef.current && !configModalRef.current.contains(event.target)) {
//       //   // Don't close if clicking on the config button
//       //   if (!event.target.closest('.config-button')) {
//       //     setIsConfigOpen(false);
//       //   }
//       // }
//     };

//     if (isConfigOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isConfigOpen]);

//   // Email validation function
//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email.trim());
//   };

//   // Validate all emails in the recipients list
//   const validateAllEmails = (emailList) => {
//     const errors = [];
//     const emails = emailList
//       .split("\n")
//       .map((e) => e.trim())
//       .filter(Boolean);

//     emails.forEach((email, index) => {
//       if (!validateEmail(email)) {
//         errors.push({
//           index: index,
//           email: email,
//           line: index + 1
//         });
//       }
//     });

//     return errors;
//   };

//   const totalEmails = useMemo(() => {
//     return recipients
//       .split("\n")
//       .map((x) => x.trim())
//       .filter(Boolean).length;
//   }, [recipients]);

//   // Validate emails whenever recipients change
//   useEffect(() => {
//     if (recipients.trim()) {
//       const errors = validateAllEmails(recipients);
//       setEmailErrors(errors);
//     } else {
//       setEmailErrors([]);
//     }
//   }, [recipients]);

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsTemplateDropdownOpen(false);
//       }
//     };

//     if (isTemplateDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isTemplateDropdownOpen]);

//   // Open config modal and fetch existing password
//   const openConfigModal = async () => {
//     setIsConfigOpen(true);
//     setPasswordError(null);
//     setPasswordSuccess(null);
//     setAppPassword("");
    
//       try {
//         setIsPasswordLoading(true);
//         const response = await authService.getAppPassword();
        
//         if (response.success && response.data.hasPassword) {
//           setAppPassword(response.data.appPassword);
//           setHasExistingPassword(true);
//         } else {
//           setHasExistingPassword(false);
//         }
//       } catch (error) {
//         console.error('Error fetching app password:', error);
//         setPasswordError('Failed to fetch existing password');
//       } finally {
//         setIsPasswordLoading(false);
//       }
    
//   };

//   // Save app password
//   const handleSavePassword = async () => {
//     if (!appPassword || appPassword.trim() === '') {
//       setPasswordError('Please enter an app password');
//       return;
//     }

//     try {
//       setIsPasswordLoading(true);
//       setPasswordError(null);
//       setPasswordSuccess(null);

//       const response = await authService.saveAppPassword(appPassword.trim());
      
//       if (response.success) {
//         setPasswordSuccess('App password saved successfully!');
//         setHasExistingPassword(true);
//         // Close modal after 2 seconds
//         setTimeout(() => {
//           setIsConfigOpen(false);
//         }, 2000);
//       } else {
//         setPasswordError(response.msg || 'Failed to save app password');
//       }
//     } catch (error) {
//       console.error('Error saving app password:', error);
//       setPasswordError(error.msg || 'Failed to save app password');
//     } finally {
//       setIsPasswordLoading(false);
//     }
//   };

//   // Close config modal
//   const closeConfigModal = () => {
//     setIsConfigOpen(false);
//     setPasswordError(null);
//     setPasswordSuccess(null);
//   };

//   const toggleTemplate = (id) => {
//     if (selectedTemplates.includes(id)) {
//       setSelectedTemplates(selectedTemplates.filter((x) => x !== id));
//     } else {
//       setSelectedTemplates([...selectedTemplates, id]);
//     }
//   };

//   const handleSend = async () => {
//     // Clear previous messages
//     setError(null);
//     setSuccessMessage(null);
    
//     // Validate from email
//     if (!fromEmail) {
//       setError("Please enter a 'From' email address.");
//       return;
//     }

//     if (!validateEmail(fromEmail)) {
//       setError("Please enter a valid 'From' email address.");
//       return;
//     }

//     // Validate CC email if provided
//     if (ccEmail && !validateEmail(ccEmail)) {
//       setError("Please enter a valid CC email address.");
//       return;
//     }

//     // Validate recipients
//     const emails = recipients
//       .split("\n")
//       .map((e) => e.trim())
//       .filter(Boolean);

//     if (emails.length === 0) {
//       setError("Please add at least one recipient email.");
//       return;
//     }

//     // Check for invalid emails in recipients
//     const invalidEmails = emailErrors.filter(error => !validateEmail(error.email));
//     if (invalidEmails.length > 0) {
//       setError(`Found ${invalidEmails.length} invalid email(s) in recipients. Please fix them.`);
//       return;
//     }

//     if (selectedTemplates.length === 0) {
//       setError("Please select at least one template.");
//       return;
//     }

//     // Prepare payload
//     const payload = {
//       fromEmail,
//       ccEmail: ccEmail || undefined,
//       templates: selectedTemplates,
//       recipients: emails,
//     };

//     console.log("Email Payload:", payload);

//     try {
//       setIsLoading(true);
      
//       const response = await emailService.sendEmail(payload);
      
//       console.log("API Response:", response);
//       setSuccessMessage(`Successfully sent ${emails.length} email(s)!`);
      
//     } catch (error) {
//       console.error("Error sending emails:", error);
//       setError(error.message || "Failed to send emails. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Get selected template objects
//   const selectedTemplateObjects = templates.filter(t => 
//     selectedTemplates.includes(t._id)
//   );

//   // Check if there are any invalid emails
//   const hasInvalidEmails = emailErrors.length > 0;

//   return (
//     <MainLayout>
//       <PageHeader 
//         title="Email Sender" 
//         subtitle="Paste one domain per line."
//         action={
//           <button
//             onClick={openConfigModal}
//             className="config-button flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-gray-700"
//           >
//             <FaCog />
//             <span>Config</span>
//           </button>
//         }
//       />

//       {/* Config Modal */}
//       {isConfigOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
//           <div 
//             ref={configModalRef}
//             className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4 relative animate-fadeIn border border-white/20"
//           >
//             {/* Modal Header */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//                 <FaCog className="text-blue-600" />
//                 Email Configuration
//               </h2>
//               <button
//                 onClick={closeConfigModal}
//                 className="text-slate-400 hover:text-slate-600 transition p-1 rounded-full hover:bg-slate-100"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* App Password Input */}
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-slate-700 mb-2">
//                 App Password
//                 {hasExistingPassword && (
//                   <span className="ml-2 text-xs font-normal text-green-600">
//                     (✓ Configured)
//                   </span>
//                 )}
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={appPassword}
//                   onChange={(e) => {
//                     setAppPassword(e.target.value);
//                     setPasswordError(null);
//                     setPasswordSuccess(null);
//                   }}
//                   placeholder="Enter your app password"
//                   className={`w-full rounded-xl border ${
//                     passwordError ? 'border-red-500' : 
//                     passwordSuccess ? 'border-green-500' : 'border-slate-300'
//                   } p-3 pr-12 outline-none focus:border-blue-500 transition`}
//                   disabled={isPasswordLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
//                 >
//                   {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//                 </button>
//               </div>
//               {passwordError && (
//                 <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                   <FaExclamationCircle className="text-xs" />
//                   {passwordError}
//                 </p>
//               )}
//               {passwordSuccess && (
//                 <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
//                   ✓ {passwordSuccess}
//                 </p>
//               )}
//               <p className="mt-2 text-xs text-slate-500">
//                 This is the app password generated from your email provider.
//                 <br />
//                 For Gmail: Enable 2FA and generate an app-specific password.
//               </p>
//             </div>

//             {/* Modal Actions */}
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={closeConfigModal}
//                 className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition font-medium"
//                 disabled={isPasswordLoading}
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleSavePassword}
//                 disabled={isPasswordLoading}
//                 className={`flex-1 py-3 rounded-xl font-medium text-white transition flex items-center justify-center gap-2 ${
//                   isPasswordLoading 
//                     ? 'bg-blue-400 cursor-not-allowed' 
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {isPasswordLoading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <FaSave />
//                     Save Password
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="min-h-screen bg-slate-100">
//         <div className="grid gap-8 lg:grid-cols-3">
//           {/* Left */}
//           <div className="lg:col-span-2">
//             <div className="rounded-3xl bg-white shadow-sm p-8">
//               {/* From Email */}
//               <div className="mb-6">
//                 <label className="mb-2 block font-semibold text-slate-700">
//                   From Email
//                 </label>
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-4 top-4 text-slate-400" />
//                   <input
//                     type="email"
//                     value={fromEmail}
//                     onChange={(e) => {
//                       setFromEmail(e.target.value);
//                       setError(null);
//                     }}
//                     placeholder="support@company.com"
//                     className={`w-full rounded-xl border ${
//                       fromEmail && !validateEmail(fromEmail) 
//                         ? 'border-red-500 focus:border-red-500' 
//                         : 'border-slate-300 focus:border-blue-500'
//                     } py-3 pl-12 pr-4 outline-none`}
//                   />
//                   {fromEmail && !validateEmail(fromEmail) && (
//                     <div className="absolute right-3 top-3 text-red-500">
//                       <FaExclamationCircle />
//                     </div>
//                   )}
//                 </div>
//                 {fromEmail && !validateEmail(fromEmail) && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <FaExclamationCircle className="text-xs" />
//                     Please enter a valid email address
//                   </p>
//                 )}
//               </div>

//               {/* CC Email */}
//               <div className="mb-6">
//                 <label className="mb-2 block font-semibold text-slate-700">
//                   CC Email <span className="font-normal text-slate-400">(Optional)</span>
//                 </label>
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-4 top-4 text-slate-400" />
//                   <input
//                     type="email"
//                     value={ccEmail}
//                     onChange={(e) => {
//                       setCcEmail(e.target.value);
//                       setError(null);
//                     }}
//                     placeholder="cc@example.com"
//                     className={`w-full rounded-xl border ${
//                       ccEmail && !validateEmail(ccEmail) 
//                         ? 'border-red-500 focus:border-red-500' 
//                         : 'border-slate-300 focus:border-blue-500'
//                     } py-3 pl-12 pr-4 outline-none`}
//                   />
//                   {ccEmail && !validateEmail(ccEmail) && (
//                     <div className="absolute right-3 top-3 text-red-500">
//                       <FaExclamationCircle />
//                     </div>
//                   )}
//                 </div>
//                 {ccEmail && !validateEmail(ccEmail) && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <FaExclamationCircle className="text-xs" />
//                     Please enter a valid email address
//                   </p>
//                 )}
//               </div>

//               {/* Templates - Multi Select Dropdown */}
//               <div className="mb-6">
//                 <label className="mb-2 block font-semibold text-slate-700">
//                   Select Templates
//                   {isTemplatesLoading && (
//                     <span className="ml-2 text-sm font-normal text-slate-500">
//                       Loading...
//                     </span>
//                   )}
//                   {templatesError && (
//                     <span className="ml-2 text-sm font-normal text-red-500">
//                       ⚠️ {templatesError}
//                     </span>
//                   )}
//                 </label>
                
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       if (!isTemplatesLoading && templates.length > 0) {
//                         setIsTemplateDropdownOpen(!isTemplateDropdownOpen);
//                       }
//                     }}
//                     disabled={isTemplatesLoading || templates.length === 0}
//                     className={`w-full rounded-xl border border-slate-300 p-3 text-left outline-none focus:border-blue-500 flex justify-between items-center ${
//                       (isTemplatesLoading || templates.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     <span className={selectedTemplates.length > 0 ? "text-slate-700" : "text-slate-400"}>
//                       {isTemplatesLoading ? 'Loading templates...' :
//                        templates.length === 0 ? 'No templates available' :
//                        selectedTemplates.length > 0 
//                         ? `${selectedTemplates.length} template${selectedTemplates.length > 1 ? 's' : ''} selected`
//                         : "Select templates..."}
//                     </span>
//                     <span className={`text-slate-400 transition-transform duration-200 ${isTemplateDropdownOpen ? 'rotate-180' : ''}`}>
//                       ▼
//                     </span>
//                   </button>

//                   {isTemplateDropdownOpen && !isTemplatesLoading && templates.length > 0 && (
//                     <div className="absolute z-10 mt-1 w-full rounded-xl border border-slate-300 bg-white shadow-lg max-h-60 overflow-auto">
//                       {templates.map((template) => (
//                         <label
//                           key={template._id}
//                           className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer transition"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={selectedTemplates.includes(template._id)}
//                             onChange={() => toggleTemplate(template._id)}
//                             className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
//                           />
//                           <span className="text-slate-700">{template.title}</span>
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Selected Templates Display */}
//                 {selectedTemplates.length > 0 && (
//                   <div className="mt-3">
//                     <p className="text-sm font-semibold text-slate-600 mb-2">Selected Templates:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedTemplateObjects.map((template) => (
//                         <span
//                           key={template._id}
//                           className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm"
//                         >
//                           <FaFileAlt className="text-blue-500" />
//                           {template.title}
//                           <button
//                             type="button"
//                             onClick={() => toggleTemplate(template._id)}
//                             className="ml-1 text-blue-400 hover:text-blue-700 font-bold"
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Recipients */}
//               <div>
//                 <label className="mb-2 block font-semibold text-slate-700">
//                   Recipients (One Email Per Line)
//                   {hasInvalidEmails && (
//                     <span className="ml-2 text-sm font-normal text-red-600">
//                       ({emailErrors.length} invalid email{emailErrors.length > 1 ? 's' : ''})
//                     </span>
//                   )}
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     rows={12}
//                     value={recipients}
//                     onChange={(e) => {
//                       setRecipients(e.target.value);
//                       setError(null);
//                     }}
//                     placeholder={`john@gmail.com
// mike@gmail.com
// sara@gmail.com`}
//                     className={`w-full rounded-xl border ${
//                       hasInvalidEmails 
//                         ? 'border-red-500 focus:border-red-500' 
//                         : 'border-slate-300 focus:border-blue-500'
//                     } p-4 outline-none resize-none font-mono text-sm`}
//                   />
//                   {hasInvalidEmails && (
//                     <div className="absolute top-3 right-3 text-red-500">
//                       <FaExclamationCircle className="text-xl" />
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Show invalid emails with line numbers */}
//                 {hasInvalidEmails && (
//                   <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-xl">
//                     <p className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
//                       <FaExclamationCircle />
//                       Invalid email addresses found:
//                     </p>
//                     <ul className="text-sm text-red-600 space-y-1">
//                       {emailErrors.map((error, idx) => (
//                         <li key={idx} className="flex items-center gap-2">
//                           <span className="font-mono bg-red-100 px-2 py-0.5 rounded text-xs">
//                             Line {error.line}
//                           </span>
//                           <span className="font-mono">{error.email}</span>
//                           <span className="text-red-400 text-xs">✕</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               {/* Error/Success Messages */}
//               {error && !emailErrors.length && (
//                 <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
//                   <FaExclamationCircle className="mt-1 flex-shrink-0" />
//                   <span>{error}</span>
//                 </div>
//               )}
//               {successMessage && (
//                 <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
//                   {successMessage}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right */}
//           <div>
//             <div className="rounded-3xl bg-white p-8 shadow-sm">
//               <h2 className="mb-6 text-2xl font-bold">Summary</h2>

//               <div className="space-y-5">
//                 <div className="flex justify-between">
//                   <span>From Email</span>
//                   <span className={`font-bold text-sm truncate max-w-[150px] ${
//                     fromEmail && !validateEmail(fromEmail) ? 'text-red-600' : ''
//                   }`}>
//                     {fromEmail || "Not set"}
//                     {fromEmail && !validateEmail(fromEmail) && ' ⚠️'}
//                   </span>
//                 </div>

//                 {ccEmail && (
//                   <div className="flex justify-between">
//                     <span>CC Email</span>
//                     <span className={`font-bold text-sm truncate max-w-[150px] ${
//                       !validateEmail(ccEmail) ? 'text-red-600' : ''
//                     }`}>
//                       {ccEmail}
//                       {!validateEmail(ccEmail) && ' ⚠️'}
//                     </span>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <span>Recipients</span>
//                   <span className={`font-bold ${hasInvalidEmails ? 'text-red-600' : ''}`}>
//                     {totalEmails}
//                     {hasInvalidEmails && ` (${emailErrors.length} invalid)`}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span>Templates</span>
//                   <span className="font-bold">{selectedTemplates.length}</span>
//                 </div>
//               </div>

//               {hasInvalidEmails && (
//                 <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-sm text-red-700 flex items-center gap-2">
//                     <FaExclamationCircle />
//                     Fix invalid emails before sending
//                   </p>
//                 </div>
//               )}

//               <div className="my-8 border-t"></div>

//               <h3 className="mb-4 text-xl font-bold">Preview</h3>

//               <div className="rounded-xl border bg-slate-50 p-4">
//                 <p className="font-semibold">Selected Templates</p>
//                 <ul className="mt-2 list-disc pl-5">
//                   {selectedTemplates.length === 0 ? (
//                     <li>No template selected</li>
//                   ) : (
//                     selectedTemplateObjects.map((t) => (
//                       <li key={t._id}>{t.title}</li>
//                     ))
//                   )}
//                 </ul>
//               </div>

//               <button
//                 onClick={handleSend}
//                 disabled={isLoading || hasInvalidEmails || isTemplatesLoading}
//                 className={`mt-8 flex w-full items-center justify-center gap-3 rounded-xl py-4 font-semibold text-white transition ${
//                   isLoading || hasInvalidEmails || isTemplatesLoading
//                     ? "bg-blue-400 cursor-not-allowed" 
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <FaPaperPlane />
//                     Send Emails
//                   </>
//                 )}
//               </button>
//               {(hasInvalidEmails || isTemplatesLoading) && (
//                 <p className="mt-2 text-center text-sm text-red-600">
//                   {isTemplatesLoading ? 'Loading templates...' : 'Please fix invalid emails to enable sending'}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

import { useMemo, useState, useRef, useEffect } from "react";
import { 
  FaPaperPlane, 
  FaEnvelope, 
  FaFileAlt, 
  FaExclamationCircle,
  FaCog,
  FaTimes,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaCheck
} from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import { emailService } from "../../services/emailService";
import { templateService } from "../../services/templateService";
import { authService } from "../../services/authService";

export default function EmailSender() {
  const [fromEmail, setFromEmail] = useState("support@company.com");
  const [ccEmail, setCcEmail] = useState("");
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [recipients, setRecipients] = useState("");
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [emailErrors, setEmailErrors] = useState([]);
  
  // Config Popup States
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [appPassword, setAppPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [hasExistingPassword, setHasExistingPassword] = useState(false);
  
  // State for templates from API
  const [templates, setTemplates] = useState([]);
  const [isTemplatesLoading, setIsTemplatesLoading] = useState(true);
  const [templatesError, setTemplatesError] = useState(null);
  
  // User role and email limit
  const [userRole, setUserRole] = useState("user");
  const [maxEmails, setMaxEmails] = useState(25);

  // Ref for dropdown container
  const dropdownRef = useRef(null);
  const configModalRef = useRef(null);

  // Get user role and limits from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        const role = userData?.role || "user";
        setUserRole(role);
        
        // Set max emails based on role
        switch (role) {
          case "superAdmin":
            setMaxEmails(50);
            break;
          case "admin":
            setMaxEmails(35);
            break;
          case "user":
          default:
            setMaxEmails(25);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserRole("user");
        setMaxEmails(25);
      }
    }
  }, []);

  // Fetch templates from API on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsTemplatesLoading(true);
        setTemplatesError(null);
        
        const response = await templateService.dropdown1();
        
        if (response.data.hasError) {
          setTemplatesError(response.msg[0] || 'Failed to load templates');
          setTemplates([]);
        } else {
          setTemplates(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        setTemplatesError('Failed to load templates. Please refresh the page.');
        setTemplates([]);
      } finally {
        setIsTemplatesLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Close config modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if (configModalRef.current && !configModalRef.current.contains(event.target)) {
      //   // Don't close if clicking on the config button
      //   if (!event.target.closest('.config-button')) {
      //     setIsConfigOpen(false);
      //   }
      // }
    };

    if (isConfigOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isConfigOpen]);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  // Validate all emails in the recipients list
  const validateAllEmails = (emailList) => {
    const errors = [];
    const emails = emailList
      .split("\n")
      .map((e) => e.trim())
      .filter(Boolean);

    emails.forEach((email, index) => {
      if (!validateEmail(email)) {
        errors.push({
          index: index,
          email: email,
          line: index + 1
        });
      }
    });

    return errors;
  };

  // Calculate total emails
  const totalEmails = useMemo(() => {
    return recipients
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean).length;
  }, [recipients]);

  // Check if there are any invalid emails - MOVED HERE BEFORE isReadyToSend
  const hasInvalidEmails = useMemo(() => {
    return emailErrors.length > 0;
  }, [emailErrors]);

  // Check if email count is within limit
  const isWithinEmailLimit = useMemo(() => {
    return totalEmails > 0 && totalEmails <= maxEmails;
  }, [totalEmails, maxEmails]);

  // Check if ready to send - MOVED AFTER hasInvalidEmails
  const isReadyToSend = useMemo(() => {
    return totalEmails > 0 && 
           totalEmails <= maxEmails && 
           !hasInvalidEmails && 
           selectedTemplates.length > 0 &&
           fromEmail &&
           validateEmail(fromEmail) &&
           (!ccEmail || validateEmail(ccEmail));
  }, [totalEmails, maxEmails, hasInvalidEmails, selectedTemplates.length, fromEmail, ccEmail]);

  // Validate emails whenever recipients change
  useEffect(() => {
    if (recipients.trim()) {
      const errors = validateAllEmails(recipients);
      setEmailErrors(errors);
    } else {
      setEmailErrors([]);
    }
  }, [recipients]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTemplateDropdownOpen(false);
      }
    };

    if (isTemplateDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTemplateDropdownOpen]);

  // Open config modal and fetch existing password
  const openConfigModal = async () => {
    setIsConfigOpen(true);
    setPasswordError(null);
    setPasswordSuccess(null);
    setAppPassword("");
    
      try {
        setIsPasswordLoading(true);
        const response = await authService.getAppPassword();
        
        if (response.success && response.data.hasPassword) {
          setAppPassword(response.data.appPassword);
          setHasExistingPassword(true);
        } else {
          setHasExistingPassword(false);
        }
      } catch (error) {
        console.error('Error fetching app password:', error);
        setPasswordError('Failed to fetch existing password');
      } finally {
        setIsPasswordLoading(false);
      }
    
  };

  // Save app password
  const handleSavePassword = async () => {
    if (!appPassword || appPassword.trim() === '') {
      setPasswordError('Please enter an app password');
      return;
    }

    try {
      setIsPasswordLoading(true);
      setPasswordError(null);
      setPasswordSuccess(null);

      const response = await authService.saveAppPassword(appPassword.trim());
      
      if (response.success) {
        setPasswordSuccess('App password saved successfully!');
        setHasExistingPassword(true);
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsConfigOpen(false);
        }, 2000);
      } else {
        setPasswordError(response.msg || 'Failed to save app password');
      }
    } catch (error) {
      console.error('Error saving app password:', error);
      setPasswordError(error.msg || 'Failed to save app password');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // Close config modal
  const closeConfigModal = () => {
    setIsConfigOpen(false);
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const toggleTemplate = (id) => {
    if (selectedTemplates.includes(id)) {
      setSelectedTemplates(selectedTemplates.filter((x) => x !== id));
    } else {
      setSelectedTemplates([...selectedTemplates, id]);
    }
  };

  const handleSend = async () => {
    // Clear previous messages
    setError(null);
    setSuccessMessage(null);
    
    // Validate from email
    if (!fromEmail) {
      setError("Please enter a 'From' email address.");
      return;
    }

    if (!validateEmail(fromEmail)) {
      setError("Please enter a valid 'From' email address.");
      return;
    }

    // Validate CC email if provided
    if (ccEmail && !validateEmail(ccEmail)) {
      setError("Please enter a valid CC email address.");
      return;
    }

    // Validate recipients
    const emails = recipients
      .split("\n")
      .map((e) => e.trim())
      .filter(Boolean);

    if (emails.length === 0) {
      setError("Please add at least one recipient email.");
      return;
    }

    // Check email limit
    if (emails.length > maxEmails) {
      setError(`Your role (${userRole}) allows a maximum of ${maxEmails} emails per batch. You have ${emails.length} emails.`);
      return;
    }

    // Check for invalid emails in recipients
    const invalidEmails = emailErrors.filter(error => !validateEmail(error.email));
    if (invalidEmails.length > 0) {
      setError(`Found ${invalidEmails.length} invalid email(s) in recipients. Please fix them.`);
      return;
    }

    if (selectedTemplates.length === 0) {
      setError("Please select at least one template.");
      return;
    }

    // Prepare payload
    const payload = {
      fromEmail,
      ccEmail: ccEmail || undefined,
      templates: selectedTemplates,
      recipients: emails,
      limit: maxEmails, // Send limit to backend
    };

    console.log("Email Payload:", payload);

    try {
      setIsLoading(true);
      
      const response = await emailService.sendEmail(payload);
      
      console.log("API Response:", response);
      setSuccessMessage(`Successfully sent ${emails.length} email(s)!`);
      
    } catch (error) {
      console.error("Error sending emails:", error);
      setError(error.message || "Failed to send emails. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get selected template objects
  const selectedTemplateObjects = templates.filter(t => 
    selectedTemplates.includes(t._id)
  );

  // Get progress percentage
  const progressPercentage = useMemo(() => {
    if (totalEmails === 0) return 0;
    return Math.min((totalEmails / maxEmails) * 100, 100);
  }, [totalEmails, maxEmails]);

  return (
    <MainLayout>
      <PageHeader 
        title="Email Sender" 
        subtitle={`Send emails to your recipients. (Max ${maxEmails} emails per batch for ${userRole} role)`}
        action={
          <button
            onClick={openConfigModal}
            className="config-button flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-gray-700"
          >
            <FaCog />
            <span>Config</span>
          </button>
        }
      />

      {/* Config Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
          <div 
            ref={configModalRef}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4 relative animate-fadeIn border border-white/20"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <FaCog className="text-blue-600" />
                Email Configuration
              </h2>
              <button
                onClick={closeConfigModal}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-full hover:bg-slate-100"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* App Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                App Password
                {hasExistingPassword && (
                  <span className="ml-2 text-xs font-normal text-green-600">
                    (✓ Configured)
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={appPassword}
                  onChange={(e) => {
                    setAppPassword(e.target.value);
                    setPasswordError(null);
                    setPasswordSuccess(null);
                  }}
                  placeholder="Enter your app password"
                  className={`w-full rounded-xl border ${
                    passwordError ? 'border-red-500' : 
                    passwordSuccess ? 'border-green-500' : 'border-slate-300'
                  } p-3 pr-12 outline-none focus:border-blue-500 transition`}
                  disabled={isPasswordLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {passwordError}
                </p>
              )}
              {passwordSuccess && (
                <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                  ✓ {passwordSuccess}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                This is the app password generated from your email provider.
                <br />
                For Gmail: Enable 2FA and generate an app-specific password.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeConfigModal}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition font-medium"
                disabled={isPasswordLoading}
              >
                Close
              </button>
              <button
                onClick={handleSavePassword}
                disabled={isPasswordLoading}
                className={`flex-1 py-3 rounded-xl font-medium text-white transition flex items-center justify-center gap-2 ${
                  isPasswordLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isPasswordLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Password
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-slate-100">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white shadow-sm p-8">
              {/* From Email */}
              <div className="mb-6">
                <label className="mb-2 block font-semibold text-slate-700">
                  From Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => {
                      setFromEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="support@company.com"
                    className={`w-full rounded-xl border ${
                      fromEmail && !validateEmail(fromEmail) 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-slate-300 focus:border-blue-500'
                    } py-3 pl-12 pr-4 outline-none`}
                  />
                  {fromEmail && !validateEmail(fromEmail) && (
                    <div className="absolute right-3 top-3 text-red-500">
                      <FaExclamationCircle />
                    </div>
                  )}
                </div>
                {fromEmail && !validateEmail(fromEmail) && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <FaExclamationCircle className="text-xs" />
                    Please enter a valid email address
                  </p>
                )}
              </div>

              {/* CC Email */}
              <div className="mb-6">
                <label className="mb-2 block font-semibold text-slate-700">
                  CC Email <span className="font-normal text-slate-400">(Optional)</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="email"
                    value={ccEmail}
                    onChange={(e) => {
                      setCcEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="cc@example.com"
                    className={`w-full rounded-xl border ${
                      ccEmail && !validateEmail(ccEmail) 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-slate-300 focus:border-blue-500'
                    } py-3 pl-12 pr-4 outline-none`}
                  />
                  {ccEmail && !validateEmail(ccEmail) && (
                    <div className="absolute right-3 top-3 text-red-500">
                      <FaExclamationCircle />
                    </div>
                  )}
                </div>
                {ccEmail && !validateEmail(ccEmail) && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <FaExclamationCircle className="text-xs" />
                    Please enter a valid email address
                  </p>
                )}
              </div>

              {/* Templates - Multi Select Dropdown */}
              <div className="mb-6">
                <label className="mb-2 block font-semibold text-slate-700">
                  Select Templates
                  {isTemplatesLoading && (
                    <span className="ml-2 text-sm font-normal text-slate-500">
                      Loading...
                    </span>
                  )}
                  {templatesError && (
                    <span className="ml-2 text-sm font-normal text-red-500">
                      ⚠️ {templatesError}
                    </span>
                  )}
                </label>
                
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isTemplatesLoading && templates.length > 0) {
                        setIsTemplateDropdownOpen(!isTemplateDropdownOpen);
                      }
                    }}
                    disabled={isTemplatesLoading || templates.length === 0}
                    className={`w-full rounded-xl border border-slate-300 p-3 text-left outline-none focus:border-blue-500 flex justify-between items-center ${
                      (isTemplatesLoading || templates.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className={selectedTemplates.length > 0 ? "text-slate-700" : "text-slate-400"}>
                      {isTemplatesLoading ? 'Loading templates...' :
                       templates.length === 0 ? 'No templates available' :
                       selectedTemplates.length > 0 
                        ? `${selectedTemplates.length} template${selectedTemplates.length > 1 ? 's' : ''} selected`
                        : "Select templates..."}
                    </span>
                    <span className={`text-slate-400 transition-transform duration-200 ${isTemplateDropdownOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {isTemplateDropdownOpen && !isTemplatesLoading && templates.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full rounded-xl border border-slate-300 bg-white shadow-lg max-h-60 overflow-auto">
                      {templates.map((template) => (
                        <label
                          key={template._id}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer transition"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTemplates.includes(template._id)}
                            onChange={() => toggleTemplate(template._id)}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                          <span className="text-slate-700">{template.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Templates Display */}
                {selectedTemplates.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-slate-600 mb-2">Selected Templates:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplateObjects.map((template) => (
                        <span
                          key={template._id}
                          className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm"
                        >
                          <FaFileAlt className="text-blue-500" />
                          {template.title}
                          <button
                            type="button"
                            onClick={() => toggleTemplate(template._id)}
                            className="ml-1 text-blue-400 hover:text-blue-700 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Recipients */}
              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Recipients (One Email Per Line)
                  {totalEmails > 0 && (
                    <span className={`ml-2 text-sm font-normal ${
                      totalEmails > maxEmails ? 'text-red-600' : 'text-slate-500'
                    }`}>
                      ({totalEmails} / {maxEmails})
                    </span>
                  )}
                  {hasInvalidEmails && (
                    <span className="ml-2 text-sm font-normal text-red-600">
                      ({emailErrors.length} invalid email{emailErrors.length > 1 ? 's' : ''})
                    </span>
                  )}
                </label>
                
                <div className="relative">
                  <textarea
                    rows={12}
                    value={recipients}
                    onChange={(e) => {
                      setRecipients(e.target.value);
                      setError(null);
                    }}
                    placeholder={`john@gmail.com
mike@gmail.com
sara@gmail.com`}
                    className={`w-full rounded-xl border ${
                      hasInvalidEmails || totalEmails > maxEmails
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-slate-300 focus:border-blue-500'
                    } p-4 outline-none resize-none font-mono text-sm`}
                  />
                  {(hasInvalidEmails || totalEmails > maxEmails) && (
                    <div className="absolute top-3 right-3 text-red-500">
                      <FaExclamationCircle className="text-xl" />
                    </div>
                  )}
                </div>

                {/* Progress bar showing limit usage */}
                {totalEmails > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-500">Limit Usage</span>
                      <span className={`font-medium ${
                        totalEmails > maxEmails ? 'text-red-600' : 
                        progressPercentage > 80 ? 'text-yellow-600' : 'text-emerald-600'
                      }`}>
                        {totalEmails} / {maxEmails}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          totalEmails > maxEmails ? 'bg-red-500' :
                          progressPercentage > 80 ? 'bg-yellow-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                    {totalEmails > 0 && totalEmails <= maxEmails && (
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-emerald-600">
                        <FaCheck className="h-3 w-3" />
                        <span className="font-medium">Ready to go!</span>
                      </div>
                    )}
                    {totalEmails > maxEmails && (
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                        <FaExclamationCircle className="h-3 w-3" />
                        <span className="font-medium">Over limit! Remove some emails.</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Show invalid emails with line numbers */}
                {hasInvalidEmails && (
                  <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                      <FaExclamationCircle />
                      Invalid email addresses found:
                    </p>
                    <ul className="text-sm text-red-600 space-y-1">
                      {emailErrors.map((error, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="font-mono bg-red-100 px-2 py-0.5 rounded text-xs">
                            Line {error.line}
                          </span>
                          <span className="font-mono">{error.email}</span>
                          <span className="text-red-400 text-xs">✕</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Error/Success Messages */}
              {error && !emailErrors.length && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
                  <FaExclamationCircle className="mt-1 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {successMessage && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                  {successMessage}
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Summary</h2>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span>From Email</span>
                  <span className={`font-bold text-sm truncate max-w-[150px] ${
                    fromEmail && !validateEmail(fromEmail) ? 'text-red-600' : ''
                  }`}>
                    {fromEmail || "Not set"}
                    {fromEmail && !validateEmail(fromEmail) && ' ⚠️'}
                  </span>
                </div>

                {ccEmail && (
                  <div className="flex justify-between">
                    <span>CC Email</span>
                    <span className={`font-bold text-sm truncate max-w-[150px] ${
                      !validateEmail(ccEmail) ? 'text-red-600' : ''
                    }`}>
                      {ccEmail}
                      {!validateEmail(ccEmail) && ' ⚠️'}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Recipients</span>
                  <span className={`font-bold ${
                    hasInvalidEmails || totalEmails > maxEmails ? 'text-red-600' : 
                    totalEmails > 0 ? 'text-emerald-600' : ''
                  }`}>
                    {totalEmails}
                    {totalEmails > 0 && ` / ${maxEmails}`}
                    {hasInvalidEmails && ` (${emailErrors.length} invalid)`}
                    {totalEmails > maxEmails && ' ⚠️ Over limit'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Templates</span>
                  <span className="font-bold">{selectedTemplates.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Your Role</span>
                  <span className={`font-bold ${
                    userRole === 'superAdmin' ? 'text-purple-600' :
                    userRole === 'admin' ? 'text-blue-600' : 'text-slate-600'
                  }`}>
                    {userRole}
                  </span>
                </div>
              </div>

              {hasInvalidEmails && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 flex items-center gap-2">
                    <FaExclamationCircle />
                    Fix invalid emails before sending
                  </p>
                </div>
              )}

              {totalEmails > maxEmails && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 flex items-center gap-2">
                    <FaExclamationCircle />
                    Reduce recipients to {maxEmails} or fewer
                  </p>
                </div>
              )}

              <div className="my-8 border-t"></div>

              <h3 className="mb-4 text-xl font-bold">Preview</h3>

              <div className="rounded-xl border bg-slate-50 p-4">
                <p className="font-semibold">Selected Templates</p>
                <ul className="mt-2 list-disc pl-5">
                  {selectedTemplates.length === 0 ? (
                    <li>No template selected</li>
                  ) : (
                    selectedTemplateObjects.map((t) => (
                      <li key={t._id}>{t.title}</li>
                    ))
                  )}
                </ul>
              </div>

              <button
                onClick={handleSend}
                disabled={isLoading || !isReadyToSend || isTemplatesLoading}
                className={`mt-8 flex w-full items-center justify-center gap-3 rounded-xl py-4 font-semibold text-white transition ${
                  isLoading || !isReadyToSend || isTemplatesLoading
                    ? "bg-blue-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Emails
                  </>
                )}
              </button>
              
              {!isReadyToSend && totalEmails > 0 && (
                <p className="mt-2 text-center text-sm text-red-600">
                  {isTemplatesLoading ? 'Loading templates...' :
                   totalEmails > maxEmails ? `Maximum ${maxEmails} emails allowed` :
                   hasInvalidEmails ? 'Please fix invalid emails' :
                   selectedTemplates.length === 0 ? 'Please select a template' :
                   !validateEmail(fromEmail) ? 'Please fix the "From" email' :
                   'Please complete all required fields'}
                </p>
              )}
              
              {isReadyToSend && (
                <p className="mt-2 text-center text-sm text-emerald-600 font-medium flex items-center justify-center gap-1">
                  <FaCheck className="h-4 w-4" />
                  Ready to send!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}