"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  TrendingUp,
  PieChart,
  Bell,
  DollarSign,
  BarChart3,
  Moon,
  Sun,
  Menu,
  X,
  Coins,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Receipt,
  Banknote,
  PiggyBank,
  Target,
  CircleDollarSign,
  HandCoins,
  Landmark,
  CandlestickChart,
  LineChart,
  BadgeDollarSign,
  Percent,
  Building2,
} from "lucide-react"

export default function ModernLanding() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      animatedIcon: <ArrowUpRight className="w-4 h-4" />,
      title: "Expense Tracking",
      desc: [
        "Log every purchase and outgoing payment in seconds with customizable categories and tags.",
        "Gain real‑time visibility into your spending habits to curb unnecessary expenses.",
      ],
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      animatedIcon: <Coins className="w-4 h-4" />,
      title: "Income Management",
      desc: [
        "Record all your income sources—salary, freelance gigs, investments—effortlessly.",
        "Track inflows over time to see how your earnings grow and diversify.",
      ],
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      animatedIcon: <Target className="w-4 h-4" />,
      title: "Budget Planner",
      desc: [
        "Set up monthly or project‑based budgets that adapt as your needs change.",
        "Receive alerts before you breach limits, keeping you on track with your financial goals.",
      ],
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      animatedIcon: <CandlestickChart className="w-4 h-4" />,
      title: "Advanced Reports",
      desc: [
        "Generate detailed charts and summaries to visualize trends across any period.",
        "Compare past performance, spot anomalies, and identify saving opportunities at a glance.",
      ],
    },
    {
      icon: <Bell className="w-8 h-8" />,
      animatedIcon: <Receipt className="w-4 h-4" />,
      title: "Reminder System",
      desc: [
        "Schedule custom reminders for bill payments, subscriptions, and financial milestones.",
        "Never miss a due date again with timely notifications delivered straight to your device.",
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Money-Related Floating Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dollar signs and coins */}
        <motion.div
          className="absolute top-20 left-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <CircleDollarSign className={`w-6 h-6 ${isDark ? "text-green-400" : "text-green-500"} opacity-60`} />
        </motion.div>

        <motion.div
          className="absolute top-32 right-20"
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Coins className={`w-8 h-8 ${isDark ? "text-yellow-400" : "text-yellow-500"} opacity-50`} />
        </motion.div>

        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{
            rotate: [0, 360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <PiggyBank className={`w-5 h-5 ${isDark ? "text-pink-400" : "text-pink-500"} opacity-40`} />
        </motion.div>

        {/* Credit cards and wallets */}
        <motion.div
          className="absolute top-1/2 right-10"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <CreditCard className={`w-7 h-7 ${isDark ? "text-blue-400" : "text-blue-500"} opacity-50`} />
        </motion.div>

        <motion.div
          className="absolute top-1/3 left-16"
          animate={{
            y: [0, -25, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Wallet className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-500"} opacity-45`} />
        </motion.div>

        {/* Charts and financial indicators */}
        <motion.div
          className="absolute bottom-1/4 left-1/3"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <LineChart className={`w-5 h-5 ${isDark ? "text-cyan-300" : "text-cyan-400"} opacity-60`} />
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-1/4"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Calculator className={`w-6 h-6 ${isDark ? "text-orange-400" : "text-orange-500"} opacity-40`} />
        </motion.div>

        {/* Banking and percentage icons */}
        <motion.div
          className="absolute top-3/4 left-20"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Landmark className={`w-5 h-5 ${isDark ? "text-indigo-300" : "text-indigo-600"}`} />
        </motion.div>

        <motion.div
          className="absolute top-1/6 right-1/3"
          animate={{
            x: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Percent className={`w-4 h-4 ${isDark ? "text-teal-400" : "text-teal-500"} opacity-50`} />
        </motion.div>

        {/* Additional money-related icons */}
        <motion.div
          className="absolute top-2/3 right-16"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Banknote className={`w-6 h-6 ${isDark ? "text-green-300" : "text-green-600"} opacity-45`} />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/2"
          animate={{
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <HandCoins className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-amber-500"} opacity-55`} />
        </motion.div>

        <motion.div
          className="absolute top-1/5 left-1/2"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 11,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <BadgeDollarSign className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-500"} opacity-40`} />
        </motion.div>

        <motion.div
          className="absolute bottom-1/5 right-1/3"
          animate={{
            x: [0, 25, 0],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Building2 className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-500"} opacity-50`} />
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            TrackMySpend
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-colors ${
                isDark ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-yellow-400"
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <button className="text-purple-600 hover:text-white border border-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300">
              Sign In
            </button>

            <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 p-4 rounded-lg backdrop-blur-md bg-white/10 border border-white/20"
            >
              <div className="flex flex-col space-y-4">
                <button className="w-full text-purple-600 hover:text-white border border-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300">
                  Sign In
                </button>
                <button className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div style={{ y: textY }} className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-5xl md:text-7xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Your Financial
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Future Starts Here
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              TrackMySpend is your personal finance sidekick, built to simplify money management and empower smarter
              decisions with cutting-edge technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-lg px-8 py-4 text-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>

              <button className="py-4 px-8 text-lg font-medium text-purple-600 focus:outline-none bg-white rounded-lg border border-purple-600 hover:bg-purple-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-purple-300 transition-all duration-300">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="TrackMySpend Dashboard"
                className="w-full h-auto rounded-lg shadow-2xl"
              />

              {/* Enhanced Floating Elements with Money Icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-xl shadow-lg flex items-center space-x-2"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <TrendingUp className="w-4 h-4" />
                </motion.div>
                <div>
                  <div className="text-sm font-semibold">+$2,450</div>
                  <div className="text-xs opacity-80">This month</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-4 rounded-xl shadow-lg flex items-center space-x-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <PieChart className="w-4 h-4" />
                </motion.div>
                <div>
                  <div className="text-sm font-semibold">Budget: 85%</div>
                  <div className="text-xs opacity-80">On track</div>
                </div>
              </motion.div>

              {/* Additional floating money stats */}
              <motion.div
                animate={{
                  x: [0, 15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-1/2 -left-6 bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <PiggyBank className="w-4 h-4" />
                </motion.div>
                <div className="text-xs font-semibold">Saved $890</div>
              </motion.div>

              <motion.div
                animate={{
                  x: [0, -15, 0],
                  y: [0, 8, 0],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-1/3 -right-6 bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-3 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <motion.div
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Target className="w-4 h-4" />
                </motion.div>
                <div className="text-xs font-semibold">5 Goals</div>
              </motion.div>

              {/* Money flow indicators */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute bottom-1/3 left-1/4 bg-gradient-to-r from-emerald-400 to-green-500 text-white p-2 rounded-lg shadow-lg flex items-center space-x-1"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Coins className="w-3 h-3" />
                </motion.div>
                <div className="text-xs font-semibold">+$125</div>
              </motion.div>

              <motion.div
                animate={{
                  x: [0, 12, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-2/3 right-1/4 bg-gradient-to-r from-red-400 to-pink-500 text-white p-2 rounded-lg shadow-lg flex items-center space-x-1"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <ArrowDownRight className="w-3 h-3" />
                </motion.div>
                <div className="text-xs font-semibold">-$45</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Powerful Features for
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Smart Money Management
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div
                  className={`h-full p-6 backdrop-blur-md border rounded-lg shadow transition-all duration-300 hover:shadow-2xl ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                      : "bg-white/60 border-gray-200 hover:bg-white/80"
                  }`}
                >
                  <div
                    className={`inline-flex p-3 rounded-xl mb-6 relative ${
                      isDark
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400"
                        : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600"
                    }`}
                  >
                    {feature.icon}
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {feature.animatedIcon}
                    </motion.div>
                  </div>

                  <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>

                  <ul className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {feature.desc.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`rounded-3xl p-12 backdrop-blur-md border ${
              isDark ? "bg-white/5 border-white/10" : "bg-white/60 border-white/40"
            }`}
          >
            {/* Money-themed animated icons around CTA */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-4 left-4"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <CircleDollarSign className={`w-6 h-6 ${isDark ? "text-green-400" : "text-green-500"} opacity-60`} />
              </motion.div>

              <motion.div
                className="absolute top-4 right-4"
                animate={{
                  x: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <HandCoins className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-amber-500"} opacity-50`} />
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Banknote className={`w-4 h-4 ${isDark ? "text-green-400" : "text-green-500"}`} />
              </motion.div>

              <motion.div
                className="absolute bottom-8 right-8"
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Calculator className={`w-5 h-5 ${isDark ? "text-orange-400" : "text-orange-500"} opacity-60`} />
              </motion.div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Financial Future?
              </span>
            </h2>

            <p className={`text-lg mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Join thousands of users who have already taken control of their finances with TrackMySpend.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-lg px-8 py-4 text-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>

              <button className="py-4 px-8 text-lg font-medium text-purple-600 focus:outline-none bg-white rounded-lg border border-purple-600 hover:bg-purple-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-purple-300 transition-all duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 px-6 py-12 border-t ${isDark ? "border-white/10" : "border-gray-200"}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            TrackMySpend
          </div>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>© 2024 TrackMySpend. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
