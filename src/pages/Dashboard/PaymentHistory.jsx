import usePayments from "../../hooks/usePayments";
import {
    History,
    CreditCard,
    CheckCircle,
    Calendar,
    DollarSign,
    FileText,
    Loader
} from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentHistory = () => {
    // Use custom hook for cleaner code
    const [payments, refetch, isLoading] = usePayments();

    return (
        <div className="min-h-screen bg-[#FAFAFA] p-2 sm:p-4 md:p-6 font-jakarta">
            <div className="max-w-7xl mx-auto">
                {/* Header Section with Unified Gradient */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mb-6 md:mb-10 bg-gradient-to-br from-[#0B2340] to-[#02bfff] rounded-3xl p-6 md:p-10 overflow-hidden shadow-xl shadow-blue-900/10"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#02bfff]/30 rounded-full blur-[50px] -ml-10 -mb-10 pointer-events-none"></div>

                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
                            <History size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
                                Payment History
                            </h2>
                            <p className="text-white/80 text-base font-medium mt-1">View your past transactions and receipts</p>
                        </div>
                    </div>
                </motion.div>

                {/* Payment History Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 min-h-[400px]"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Method</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <Loader className="w-8 h-8 text-[#02bfff] animate-spin mx-auto" />
                                            <p className="text-gray-500 text-sm mt-2">Loading history...</p>
                                        </td>
                                    </tr>
                                ) : payments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FileText className="text-gray-300 w-8 h-8" />
                                            </div>
                                            <p className="text-lg font-bold text-[#0B2340] mb-1 font-unbounded">No payment history found</p>
                                            <p className="text-gray-500 text-sm">Your completed transactions will appear here</p>
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((payment, index) => (
                                        <motion.tr
                                            key={payment._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-blue-50/30 transition-colors group"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-400 font-medium">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm font-medium text-[#0B2340]">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    {new Date(payment.date || payment.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-[#0B2340] font-unbounded">
                                                    ${(payment.price || payment.amount || 0).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-mono border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/50 group-hover:text-[#02bfff] transition-all">
                                                    {payment.transactionId || payment.orderId || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                                <div className="flex items-center gap-1.5">
                                                    <CreditCard className="w-4 h-4 text-gray-400" />
                                                    Card
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                                                    <CheckCircle className="w-3 h-3" /> PAID
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PaymentHistory;
