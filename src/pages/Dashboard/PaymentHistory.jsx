import usePayments from "../../hooks/usePayments";
import { FaHistory, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const PaymentHistory = () => {
    // Use custom hook for cleaner code
    const [payments] = usePayments();

    return (
        <div className="min-h-screen bg-[#FFFFFF] p-2 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#FCBB45]/10 rounded-xl">
                            <FaHistory className="text-[#FCBB45] text-xl md:text-2xl" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#005482]">Payment History</h2>
                    </div>
                    <p className="text-[#70C5D7] text-sm md:text-lg">View your payment transactions</p>
                </div>

                {/* Payment History Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#70C5D7]/20">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#005482] text-white">
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">#</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Date</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Amount</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Transaction ID</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Method</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#70C5D7]/10">
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-3 md:px-6 py-6 md:py-8 text-center text-[#005482]">
                                            <FaMoneyBillWave className="text-3xl md:text-4xl text-[#DA3A60] mx-auto mb-2 md:mb-3" />
                                            <p className="text-base md:text-lg font-medium mb-1">No payment history found</p>
                                            <p className="text-xs md:text-sm text-[#005482]/70">Your payment transactions will appear here</p>
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((payment, index) => (
                                        <tr key={payment._id} className="hover:bg-[#70C5D7]/5 transition-colors">
                                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
                                                {index + 1}
                                            </td>
                                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
                                                {new Date(payment.date || payment.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-[#DA3A60]">
                                                ${payment.price?.toFixed(2) || payment.amount?.toFixed(2) || '0.00'}
                                            </td>
                                            <td className="px-3 md:px-6 py-3 md:py-4">
                                                <span className="inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-[#FCBB45]/10 text-[#005482] text-xs md:text-sm font-medium">
                                                    {payment.transactionId || payment.orderId || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
                                                Card
                                            </td>
                                            <td className="px-3 md:px-6 py-3 md:py-4">
                                                <span className="inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-green-100 text-green-700 text-xs md:text-sm font-medium">
                                                    <FaCheckCircle className="text-xs" /> PAID
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;

