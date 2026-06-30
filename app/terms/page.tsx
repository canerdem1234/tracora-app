import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Kullanım Şartları — Tracora",
  description: "Tracora hizmetini kullanmadan önce lütfen kullanım şartlarını okuyunuz.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="text-white font-bold text-lg">Tracora</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Kullanım Şartları</h1>
          <p className="text-slate-400 text-sm">Son güncelleme: 1 Temmuz 2025 &nbsp;|&nbsp; Yürürlük tarihi: 1 Temmuz 2025</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-sm leading-7">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Taraflar ve Kapsam</h2>
            <p>
              Bu Kullanım Şartları ("Şartlar"), <strong className="text-white">Tracora</strong> markası altında sunulan yapay zeka görünürlük
              takip hizmetini ("Hizmet") işleten hizmet sağlayıcı ("Tracora", "biz", "bizim") ile
              Hizmet'i kullanan gerçek veya tüzel kişiler ("Kullanıcı", "siz") arasında akdedilen
              bağlayıcı bir sözleşmeyi oluşturmaktadır.
            </p>
            <p className="mt-3">
              Hizmet'e erişerek, hesap oluşturarak veya herhangi bir abonelik planı satın alarak
              bu Şartlar'ı okuduğunuzu, anladığınızı ve tüm hükümlerine uymayı kabul ettiğinizi
              beyan etmektesiniz. <strong className="text-white">Bu Şartlar'ı kabul etmiyorsanız Hizmet'i kullanamazsınız.</strong>
            </p>
            <p className="mt-3">
              Hizmet yalnızca 18 yaşını doldurmuş, yasal ehliyet sahibi kişilere sunulmaktadır.
              Bir tüzel kişilik adına işlem gerçekleştiriyorsanız, söz konusu tüzel kişiliği bu
              Şartlar kapsamında bağlama yetkisine sahip olduğunuzu beyan ve taahhüt edersiniz.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Hizmet Tanımı</h2>
            <p>
              Tracora; ChatGPT, Perplexity, Google Gemini, Anthropic Claude, X (Twitter) Grok,
              Microsoft Copilot, Meta AI, DeepSeek ve diğer yapay zeka motorlarında
              ("AI Motorları") markaların, ürünlerin ve anahtar kelimelerin ne ölçüde görünür
              olduğunu izleyen ve raporlayan bir yazılım hizmetidir (SaaS).
            </p>
            <p className="mt-3">
              Hizmet kapsamında sunulan başlıca işlevler şunlardır:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>AI motorlarında marka/anahtar kelime izleme ve raporlama</li>
              <li>Görünürlük puanı ve zaman serisi analizi</li>
              <li>AI motorları arasında karşılaştırmalı performans göstergeleri</li>
              <li>Anlık bildirimler (e-posta, Slack, Microsoft Teams)</li>
              <li>CRM entegrasyonları (HubSpot, Salesforce)</li>
              <li>API erişimi ve özelleştirilebilir raporlar</li>
            </ul>
            <p className="mt-3">
              Hizmet'in kapsamı ve sunulan özellikler seçilen abonelik planına göre değişiklik
              gösterebilir. Tracora, Hizmet kapsamını önceden bildirmek koşuluyla genişletme veya
              daraltma hakkını saklı tutar.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Hesap Kaydı ve Güvenlik</h2>
            <p>
              Hizmet'in tamamına erişim için bir hesap oluşturmanız gerekmektedir. Kayıt sırasında
              verdiğiniz bilgilerin doğru, eksiksiz ve güncel olduğunu kabul edersiniz. Yanlış bilgi
              verilmesi, hesabın askıya alınması veya kapatılması sonucunu doğurabilir.
            </p>
            <p className="mt-3">
              Hesap kimlik bilgilerinizin (e-posta, şifre) gizliliğini korumaktan yalnızca siz
              sorumlusunuz. Hesabınız üzerinden gerçekleştirilen tüm etkinliklerden doğan sorumluluk
              size aittir. Hesabınızda yetkisiz erişim ya da güvenlik ihlali tespit etmeniz
              halinde derhal <a href="mailto:security@tracora.ai" className="text-indigo-400 hover:text-indigo-300">security@tracora.ai</a> adresine bildirmeniz gerekmektedir.
            </p>
            <p className="mt-3">
              Tracora, hesap güvenliğinizi artırmak amacıyla çok faktörlü kimlik doğrulama (MFA)
              uygulama hakkını saklı tutar. Tracora'nın hesap bilgilerinizi talep eden e-posta
              veya mesajlar göndermeyeceğini, bu tür girişimlerin kimlik avı (phishing) saldırısı
              olduğunu lütfen unutmayınız.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Abonelik, Ödeme ve İptal</h2>
            <p>
              Hizmet; aylık veya yıllık olarak yenilenen abonelik modeli üzerinden sunulmaktadır.
              Seçilen plan ve fiyatlandırma bilgileri <Link href="/#pricing" className="text-indigo-400 hover:text-indigo-300">fiyatlar sayfasında</Link> yer almaktadır.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>Abonelik ücretleri, her dönem başında belirtilen ödeme yönteminden otomatik tahsil edilir.</li>
              <li>Tüm ücretler Türk Lirası (TRY) veya Amerikan Doları (USD) cinsinden belirtilir ve KDV hariçtir.</li>
              <li>Yıllık abonelik indirimi, tam yıl ödemesinin yapılmasına bağlıdır; ara dönem iptallerde iade yapılmaz.</li>
              <li>Ödeme başarısız olması halinde Tracora, hizmet erişimini kısıtlama veya askıya alma hakkına sahiptir.</li>
              <li>İptal talebi, mevcut dönemin bitiminden en az 24 saat önce hesap ayarları üzerinden gerçekleştirilmelidir.</li>
            </ul>
            <p className="mt-3">
              6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamındaki cayma hakkı, dijital
              içerik hizmetlerine ilişkin istisnalar saklı kalmak kaydıyla, abonelik başlangıcından
              itibaren 14 gün içinde kullanılabilir. Cayma hakkı kullanılması durumunda iade süreci
              Tracora tarafından 14 gün içinde tamamlanır.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Kabul Edilebilir Kullanım ve Yasak Faaliyetler</h2>
            <p>Hizmet'i kullanırken aşağıdaki faaliyetlerde bulunmanız kesinlikle yasaktır:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>Hizmet'i yasalara, düzenlemelere veya üçüncü taraf haklarına aykırı biçimde kullanmak</li>
              <li>Tracora sistemlerine yetkisiz erişim sağlamaya çalışmak, tersine mühendislik uygulamak veya kaynak kodunu elde etmeye çalışmak</li>
              <li>Hizmet altyapısına zarar verebilecek aşırı API çağrısı, DDoS saldırısı veya benzeri yük oluşturmak</li>
              <li>Hizmet üzerinden elde edilen verileri rakip bir ürün geliştirmek amacıyla kullanmak</li>
              <li>Tracora'nın izni olmaksızın hizmet erişimini üçüncü taraflara devretmek veya yeniden satmak</li>
              <li>Spam, kötü amaçlı yazılım veya yanıltıcı içerik dağıtmak</li>
              <li>AI motorları aracılığıyla elde edilen verileri, üçüncü tarafları hedef alan yanıltıcı reklam, dezenformasyon veya manipülasyon kampanyalarında kullanmak</li>
              <li>Tracora veya iş ortaklarının ticari itibarını zedeleyici, karalayıcı ya da yanıltıcı beyanlarda bulunmak</li>
            </ul>
            <p className="mt-3">
              Tracora, bu hükümlerin ihlal edildiğini tespit etmesi durumunda önceden bildirim
              yapmaksızın hesabı askıya alma veya kalıcı olarak kapatma hakkını saklı tutar.
              Ciddi ihlallerde yasal yollara başvurulabilir.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Veri ve Yapay Zeka Çıktılarına İlişkin Sorumluluk Reddi</h2>
            <p>
              Tracora'nın sunduğu görünürlük verileri, üçüncü taraf AI motorlarına gerçek zamanlı
              sorgular yapılarak elde edilmektedir. Bu motorların yanıt kalitesi, kapsama alanı ve
              çıktı tutarlılığı Tracora'nın kontrolü dışındadır.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mt-4 space-y-2">
              <p className="font-semibold text-amber-300">Önemli Uyarılar:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 text-slate-300">
                <li>Tracora, AI çıktılarının doğruluğunu, eksiksizliğini veya güncelliğini garanti etmemektedir.</li>
                <li>Görünürlük puanları ve raporlar, bilgilendirme amaçlı olup ticari karar almada tek dayanak olarak kullanılmamalıdır.</li>
                <li>AI motorlarının yanıt davranışları algoritmik güncellemeler nedeniyle önceden haber verilmeksizin değişebilir.</li>
                <li>Tracora, kullanıcıların bu verilere dayanarak aldığı kararlardan doğan zararlardan sorumlu değildir.</li>
              </ul>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Karşılaştırmalı Bilgilere İlişkin Açıklama</h2>
            <p>
              Tracora web sitesi ve pazarlama materyallerinde zaman zaman genel piyasa karşılaştırmaları
              yer almaktadır. Bu karşılaştırmalar:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>Kamuya açık kaynaklarda yer alan genel özellik bilgilerine dayanan <strong className="text-white">olgusal ve dürüst</strong> gözlemlerdir.</li>
              <li>Herhangi bir rakip ürün veya marka hakkında karalayıcı, yanıltıcı ya da aşağılayıcı nitelik taşımaz.</li>
              <li>Yanlış veya güncel olmayan bilgi içerdiğini düşünüyorsanız <a href="mailto:legal@tracora.ai" className="text-indigo-400 hover:text-indigo-300">legal@tracora.ai</a> adresine bildirebilirsiniz; gerekli inceleme yapılarak düzeltme gerçekleştirilecektir.</li>
            </ul>
            <p className="mt-3">
              Tracora; 6102 sayılı Türk Ticaret Kanunu'nun haksız rekabete ilişkin hükümleri ile
              Reklam Kurulu düzenlemeleri kapsamında rakiplere ilişkin yalnızca <em>doğru, dürüst ve
              dürüstlük kurallarına uygun</em> karşılaştırmalı bilgilere yer vermeyi taahhüt etmektedir.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Fikri Mülkiyet</h2>
            <p>
              Hizmet'e ait yazılım, algoritma, kullanıcı arayüzü, tasarım, marka, logo, ticari
              ad ve diğer tüm fikri mülkiyet hakları Tracora'ya aittir ve Türkiye Cumhuriyeti'nin
              5846 sayılı Fikir ve Sanat Eserleri Kanunu ile uluslararası telif hakkı antlaşmaları
              kapsamında korunmaktadır.
            </p>
            <p className="mt-3">
              Kullanıcılara bu Şartlar kapsamında yalnızca sınırlı, münhasır olmayan, devredilemez
              ve geri alınabilir bir kullanım lisansı tanınmaktadır. Bu lisans; Hizmet'i yalnızca
              kendi iş amaçlarınız doğrultusunda kullanmanıza imkân tanır; Hizmet'i kopyalamanıza,
              değiştirmenize, dağıtmanıza veya türev çalışmalar oluşturmanıza izin vermez.
            </p>
            <p className="mt-3">
              Kullanıcı, Hizmet'e yüklediği veya paylaştığı içerikler (marka adı, logo, sorgu
              verileri vb.) üzerindeki fikri mülkiyet haklarını muhafaza eder. Tracora'ya yalnızca
              söz konusu içerikleri Hizmet'i sunmak amacıyla işleme hakkı tanınmış olmakla birlikte
              bu hak hiçbir koşulda üçüncü taraflarla ticari amaçlı paylaşım içermez.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Gizlilik ve Kişisel Veriler</h2>
            <p>
              Tracora, kullanıcılara ait kişisel verileri 6698 sayılı Kişisel Verilerin Korunması
              Kanunu (KVKK) ile Avrupa Genel Veri Koruma Tüzüğü (GDPR) kapsamında işlemektedir.
              Hangi verilerin toplandığı, nasıl kullanıldığı ve haklarınızın neler olduğu hakkında
              ayrıntılı bilgi için <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">Gizlilik Politikamızı</Link> inceleyiniz.
            </p>
            <p className="mt-3">
              Gizlilik Politikası bu Şartlar'ın ayrılmaz bir parçasını oluşturmaktadır.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Sorumluluk Sınırlaması</h2>
            <p>
              Yürürlükteki mevzuatın izin verdiği azami ölçüde:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>Tracora; dolaylı, arızi, özel, cezai veya sonuç olarak ortaya çıkan zararlardan (kâr kaybı, veri kaybı, itibar kaybı dahil) sorumlu değildir.</li>
              <li>Tracora'nın bu Şartlar kapsamındaki toplam sorumluluğu, zararın meydana geldiği tarihten önceki <strong className="text-white">on iki (12) aylık dönemde</strong> Kullanıcı tarafından ödenen abonelik ücretiyle sınırlıdır.</li>
              <li>Tracora, üçüncü taraf AI motorlarının hizmet kesintilerinden, veri hatalıklarından veya politika değişikliklerinden doğan zararlardan sorumlu değildir.</li>
              <li>Hizmet'in kesintisiz veya hatasız çalışacağına dair herhangi bir taahhütte bulunulmamaktadır.</li>
            </ul>
            <p className="mt-3">
              Tüketici sıfatındaki kullanıcıların 6502 sayılı Kanun kapsamındaki yasal hakları saklıdır.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">11. Garanti Reddi</h2>
            <p>
              Hizmet, yürürlükteki mevzuatın izin verdiği azami ölçüde, <strong className="text-white">"olduğu gibi"
              ve "mevcut haliyle"</strong> sunulmaktadır. Tracora; belirli bir amaca uygunluk,
              satılabilirlik, kesintisiz erişim veya hatasız çalışma konularında açık ya da zımni
              herhangi bir garanti vermemektedir.
            </p>
            <p className="mt-3">
              AI görünürlük verileri, bilgilendirme amacı taşıyan analitik çıktılardır. Tracora,
              bu verilerin ticari kararlar açısından doğruluğunu teyit eden bir güvence vermez.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">12. Tazminat</h2>
            <p>
              Kullanıcı; bu Şartlar'ı ihlal etmesi, hatalı veya yanıltıcı bilgi sunması, üçüncü
              taraf haklarını ihlal etmesi ya da Hizmet'i yasadışı amaçlarla kullanması nedeniyle
              Tracora'nın ve bağlı kuruluşlarının maruz kaldığı tüm zararları, masrafları,
              yükümlülükleri ve avukatlık ücretlerini tazmin etmeyi kabul eder.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">13. Fesih</h2>
            <p>
              Kullanıcı, hesabını istediği zaman kapatabilir. Hesap kapatma işlemi, mevcut
              abonelik dönemi sona erene kadar erişim hakkını etkilemez; erken iptallerde
              kalan süreye ilişkin iade yapılmaz.
            </p>
            <p className="mt-3">
              Tracora; Şartlar'ın ihlali, dolandırıcılık şüphesi, hizmet güvenliğine yönelik
              tehdit veya uzun süreli ödeme gecikmesi gibi durumlarda Kullanıcı hesabını
              önceden bildirim yapmaksızın ya da kısa bildirim süresiyle askıya alma veya
              kapatma hakkını saklı tutar. Ağır ihlaller dışındaki durumlarda hesap kapatma
              kararından en az 7 gün önce bildirim yapılmaya çalışılır.
            </p>
            <p className="mt-3">
              Feshin ardından kullanıcıya ait veriler Gizlilik Politikası'nda belirtilen saklama
              süreleri dolana kadar muhafaza edilir.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">14. Değişiklikler</h2>
            <p>
              Tracora, bu Şartlar'ı zaman zaman güncelleyebilir. Önemli değişiklikler, yürürlük
              tarihinden en az 30 gün önce kayıtlı e-posta adresinize bildirilecek veya Hizmet
              içinde belirgin biçimde duyurulacaktır. Değişiklik tarihinden sonra Hizmet'i
              kullanmaya devam etmeniz, güncel Şartlar'ı kabul ettiğiniz anlamına gelir.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">15. Uygulanacak Hukuk ve Yetki</h2>
            <p>
              Bu Şartlar, Türkiye Cumhuriyeti kanunlarına tabidir. Bu Şartlar'dan doğan her türlü
              uyuşmazlıkta <strong className="text-white">İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri</strong> münhasıran
              yetkilidir.
            </p>
            <p className="mt-3">
              Uyuşmazlıkların dava yoluna başvurulmadan önce taraflarca iyi niyetle müzakere yoluyla
              çözülmesi esastır. Müzakere talebinin karşı tarafa iletilmesinden itibaren 30 gün
              içinde çözüme ulaşılamazsa taraflar yasal yollara başvurabilir.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">16. Mücbir Sebep</h2>
            <p>
              Tracora; doğal afet, savaş, terör eylemi, pandemi, siber saldırı, elektrik veya
              internet altyapısı kesintisi, yetkili makam kararı ya da kontrolü dışındaki diğer
              mücbir sebep halleri nedeniyle Hizmet'i sunamaması durumunda sorumlu tutulamaz.
              Mücbir sebep süresince yükümlülükler askıya alınır; bu durum sözleşmenin ihlali
              sayılmaz.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">17. Bölünebilirlik ve Feragat</h2>
            <p>
              Bu Şartlar'ın herhangi bir hükmünün yetkili mahkemece geçersiz veya uygulanamaz
              sayılması halinde, ilgili hüküm geçerli en yakın anlama kavuşturacak biçimde tadil
              edilecek; geri kalan hükümler tam olarak yürürlükte kalmaya devam edecektir.
            </p>
            <p className="mt-3">
              Tracora'nın herhangi bir hakkından bir kez vazgeçmiş olması, ileride söz konusu
              haktan vazgeçtiği anlamına gelmez.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">18. İletişim</h2>
            <p>Bu Şartlar hakkında sorularınız için:</p>
            <div className="bg-white/3 border border-white/5 rounded-xl p-5 mt-4 space-y-2">
              <p><strong className="text-white">Tracora</strong></p>
              <p>E-posta: <a href="mailto:legal@tracora.ai" className="text-indigo-400 hover:text-indigo-300">legal@tracora.ai</a></p>
              <p>Genel destek: <a href="mailto:support@tracora.ai" className="text-indigo-400 hover:text-indigo-300">support@tracora.ai</a></p>
              <p>Güvenlik bildirimleri: <a href="mailto:security@tracora.ai" className="text-indigo-400 hover:text-indigo-300">security@tracora.ai</a></p>
              <p>Web: <a href="https://tracora.ai" className="text-indigo-400 hover:text-indigo-300">https://tracora.ai</a></p>
            </div>
          </section>

        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Gizlilik Politikası</Link>
          <Link href="/user-agreement" className="hover:text-indigo-400 transition-colors">Kullanıcı Sözleşmesi</Link>
          <Link href="/" className="hover:text-indigo-400 transition-colors">Ana Sayfa</Link>
        </div>
      </main>
    </div>
  );
}
