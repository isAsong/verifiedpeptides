// app/calculator/CalculatorClient.jsx
'use client';

import { useState, useEffect } from 'react';
import { getWhatsAppLink,WHATSAPP_NUMBER } from '@/lib/config';
export default function CalculatorClient() {
  // --- 表单状态 ---
  const [syringeVolume, setSyringeVolume] = useState(1); // ml
  const [vialQuantity, setVialQuantity] = useState(5); // mg
  const [bacteriostaticWater, setBacteriostaticWater] = useState(2); // ml
  const [desiredDose, setDesiredDose] = useState(250); // mcg

  // --- 计算结果状态 ---
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // 注射器总格数（标准胰岛素注射器为 100 格）
  const TOTAL_TICKS = 100;

  // --- 计算逻辑 ---
  const calculate = () => {
    setError('');

    // 输入验证
    if (!syringeVolume || syringeVolume <= 0) {
      setError('Please enter a valid syringe volume.');
      return;
    }
    if (!vialQuantity || vialQuantity <= 0) {
      setError('Please enter a valid peptide vial quantity.');
      return;
    }
    if (!bacteriostaticWater || bacteriostaticWater <= 0) {
      setError('Please enter a valid amount of bacteriostatic water.');
      return;
    }
    if (!desiredDose || desiredDose <= 0) {
      setError('Please enter a valid desired dose.');
      return;
    }

    // 1. 总肽量 (mcg)
    const totalPeptideMcg = vialQuantity * 1000;

    // 2. 浓度 (mcg/ml)
    const concentration = totalPeptideMcg / bacteriostaticWater;

    // 3. 目标剂量对应的体积 (ml)
    const doseVolumeMl = desiredDose / concentration;

    // 4. 注射器总容量 (ml)
    const syringeCapacityMl = syringeVolume;

    // 5. 每格对应的体积 (ml/格)
    const volumePerTick = syringeCapacityMl / TOTAL_TICKS;

    // 6. 目标剂量对应的格数
    const ticksNeeded = doseVolumeMl / volumePerTick;

    // 7. 每格对应的 mcg 值
    const mcgPerTick = concentration * volumePerTick;

    // 8. 警告：目标体积是否超过注射器容量
    const warning = doseVolumeMl > syringeCapacityMl;

    // 9. 限制最大显示刻度（不超过 100 格）
    const displayTicks = Math.min(ticksNeeded, TOTAL_TICKS);

    setResult({
      concentration: concentration, // mcg/ml
      doseVolumeMl: doseVolumeMl,
      ticksNeeded: ticksNeeded,
      displayTicks: displayTicks,
      mcgPerTick: mcgPerTick,
      warning: warning,
      syringeCapacityMl: syringeCapacityMl,
      totalPeptideMcg: totalPeptideMcg,
      totalWaterMl: bacteriostaticWater,
      volumePerTick: volumePerTick,
    });
  };

  // --- 自动计算（参数变化时重新计算） ---
  useEffect(() => {
    calculate();
  }, [syringeVolume, vialQuantity, bacteriostaticWater, desiredDose]);

  // --- 重置表单 ---
  const resetForm = () => {
    setSyringeVolume(1);
    setVialQuantity(5);
    setBacteriostaticWater(2);
    setDesiredDose(250);
    setResult(null);
    setError('');
  };

  // --- WhatsApp 链接 ---
  const whatsappLink =
    getWhatsAppLink();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 页面标题 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Peptide Calculator</h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Calculate the correct reconstitution volume and syringe pull for your research peptides.
        </p>
      </div>

      {/* 主体：两栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 左侧：表单 (占 2/5) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Your Parameters</h2>

            <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-4">
              {/* 注射器容量 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Syringe Volume (ml)
                </label>
                <select
                  value={syringeVolume}
                  onChange={(e) => setSyringeVolume(parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="0.3">0.3 ml</option>
                  <option value="0.5">0.5 ml</option>
                  <option value="1">1 ml</option>
                  <option value="3">3 ml</option>
                  <option value="5">5 ml</option>
                  <option value="10">10 ml</option>
                </select>
              </div>

              {/* 肽总量 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Peptide Vial Quantity (mg)
                </label>
                <input
                  type="number"
                  value={vialQuantity}
                  onChange={(e) => setVialQuantity(parseFloat(e.target.value) || 0)}
                  min="0.1"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., 5"
                />
              </div>

              {/* 抑菌水 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bacteriostatic Water (ml)
                </label>
                <input
                  type="number"
                  value={bacteriostaticWater}
                  onChange={(e) => setBacteriostaticWater(parseFloat(e.target.value) || 0)}
                  min="0.1"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., 2"
                />
              </div>

              {/* 目标剂量 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Dose (mcg)
                </label>
                <input
                  type="number"
                  value={desiredDose}
                  onChange={(e) => setDesiredDose(parseFloat(e.target.value) || 0)}
                  min="1"
                  step="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., 250"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  ⚠️ {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* WhatsApp 引流 */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Need help? Contact our experts:</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat with us on WhatsApp
              </a>
              <p className="mt-2 text-xs text-gray-400 text-center">We typically respond within minutes</p>
            </div>
          </div>
        </div>

        {/* 右侧：结果 + 注射器可视化 (占 3/5) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Results</h2>

            {result ? (
              <div className="space-y-6">
                {/* 注射器可视化 */}


                {/* 数值结果 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
                    <p className="text-xs text-gray-500">Concentration</p>
                    <p className="text-lg font-bold text-blue-700">
                      {(result.concentration / 1000).toFixed(2)} mcg/μl
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100 text-center">
                    <p className="text-xs text-gray-500">Dose Volume</p>
                    <p className="text-lg font-bold text-green-700">
                      {(result.doseVolumeMl * 1000).toFixed(1)} μl
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-center">
                    <p className="text-xs text-gray-500">Ticks Needed</p>
                    <p className="text-lg font-bold text-purple-700">
                      {Math.round(result.ticksNeeded)} / {TOTAL_TICKS}
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-center">
                    <p className="text-xs text-gray-500">Per Tick</p>
                    <p className="text-lg font-bold text-amber-700">
                      {result.mcgPerTick.toFixed(1)} mcg
                    </p>
                  </div>
                </div>

                {/* 警告 */}
                {result.warning && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800">
                      ⚠️ Warning: Syringe volume is not sufficient for specified dosage
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      Required: {(result.doseVolumeMl * 1000).toFixed(0)} μl &gt; Capacity: {result.syringeCapacityMl * 1000} μl
                    </p>
                    <p className="text-xs text-red-700">
                      Consider using a larger syringe or adjusting your dosage.
                    </p>
                  </div>
                )}

                {/* 详细参数摘要 */}
                <div className="pt-4 border-t border-gray-200 text-xs text-gray-500 flex flex-wrap gap-x-4">
                  <span><span className="font-medium">Total Peptide:</span> {result.totalPeptideMcg} mcg ({(result.totalPeptideMcg/1000).toFixed(1)} mg)</span>
                  <span><span className="font-medium">Water Added:</span> {result.totalWaterMl} ml</span>
                  <span><span className="font-medium">Syringe:</span> {result.syringeCapacityMl} ml</span>
                  <span><span className="font-medium">Target Dose:</span> {desiredDose} mcg</span>
                </div>

                {/* WhatsApp 快速咨询 */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-lg border border-green-200 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Need clarification? Ask on WhatsApp
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center text-gray-400">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-6 3v-3m-6 3h18M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
                <p className="text-sm">Adjust parameters and click Calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This calculator is for research purposes only. Always verify your calculations.</p>
        <p className="mt-1">
          For urgent questions,{' '}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium">
            contact us on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}

