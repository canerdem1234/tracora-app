import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Kullanıcı ve Abone Sözleşmesi — Tracora",
  description: "Tracora SaaS abonelik hizmeti için bağlayıcı kullanıcı sözleşmesi.",
};

export default function UserAgreementPage() {
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
          <h1 className="text-4xl font-bold text-white mb-3">Kullanıcı ve Abone Sözleşmesi</h1>
          <p className="text-slate-400 text-sm">Son güncelleme: 1 Temmuz 2025 &nbsp;|&nbsp; Yürürlük tarihi: 1 Temmuz 2025</p>
          <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="text-amber-300 text-sm">
              Bu Sözleşme; Tracora hizmetine abone olarak kaydını tamamlayan her kullanıcı tarafından elektronik
              ortamda kabul edilmekte olup 6098 sayılı Türk Borçlar Kanunu ve 6563 sayılı Elektronik Ticaret
              Kanunu kapsamında bağlayıcı hukuki nitelik taşımaktadır.
            </p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-sm leading-7">

          {/* Taraflar */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 1 — Taraflar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">Hizmet Sağlayıcı</p>
                <p className="text-white font-semibold">Tracora</p>
                <p className="mt-1">Web: tracora.ai</p>
                <p>E-posta: legal@tracora.ai</p>
                <p className="mt-2 text-xs text-slate-500">("Tracora", "Sağlayıcı", "Biz")</p>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">Kullanıcı / Abone</p>
                <p className="text-white font-semibold">Kayıt formunu dolduran gerçek veya tüzel kişi</p>
                <p className="mt-2 text-xs text-slate-500">("Kullanıcı", "Abone", "Siz")</p>
                <p className="mt-2 text-xs text-slate-400">Tüzel kişilik adına kayıt yapan kişi, bu kişiliği temsil ve ilzam yetkisine sahip olduğunu beyan eder.</p>
              </div>
            </div>
          </section>

          {/* Konu */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 2 — Sözleşmenin Konusu</h2>
            <p>
              Bu Sözleşme; Tracora'nın <strong className="text-white">tracora.ai</strong> adresi üzerinden sunduğu yapay zeka
              görünürlük takip ve analiz platformuna ("Platform") erişim ile abonelik koşullarını, tarafların
              hak ve yükümlülüklerini ve uyuşmazlık çözüm mekanizmalarını düzenlemektedir.
            </p>
          </section>

          {/* Abonelik Planları */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 3 — Abonelik, Hizmet Düzeyi ve Erişim</h2>
            <p>
              Kullanıcı, Platform'a erişim için seçtiği abonelik planına ilişkin ücreti ve kapsamı,
              kayıt akışında ve <Link href="/#pricing" className="text-indigo-400 hover:text-indigo-300">fiyatlar sayfasında</Link> belirtilen koşullarla kabul eder.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>Abonelik; aylık veya yıllık dönemlerle yenilenir ve aksi açıkça bildirilmediği sürece otomatik olarak uzar.</li>
              <li>Platform erişimi, ilgili ödeme dönemine özel olup ödeme başarısız olması halinde erişim kısıtlanabilir.</li>
              <li>Tracora, hizmet kapsamını önceden bildirmek kaydıyla özellik ekleyebilir veya kaldırabilir; bu durum fiyat artışı niteliği taşımadığı sürece Kullanıcı'ya ek ücret yansıtılmaz.</li>
              <li>Planlı bakım çalışmaları en az 48 saat önceden duyurulur; acil bakımlar için mümkün olan en kısa sürede bildirim yapılır.</li>
            </ul>

            <div className="bg-white/3 border border-white/5 rounded-xl p-5 mt-5">
              <p className="text-white font-medium mb-2">Hizmet Seviyesi Taahhüdü (SLA)</p>
              <p>
                Tracora, Platform altyapısı için aylık <strong className="text-white">%99,5</strong> çalışma süresi hedefi
                gözetmektedir. Bu taahhüt; planlı bakım süreleri, üçüncü taraf AI motorlarının kesintileri
                ve mücbir sebep hallerini kapsamamaktadır. SLA ihlali tespit edilmesi durumunda
                Kullanıcı, aşağıdaki kredi talebinde bulunabilir:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-slate-300">
                <li>%99,5 – %99,0 arası çalışma süresi: bir sonraki faturada %10 kredi</li>
                <li>%99,0 – %95,0 arası çalışma süresi: bir sonraki faturada %25 kredi</li>
                <li>%95'in altında çalışma süresi: bir sonraki faturada %50 kredi</li>
              </ul>
              <p className="mt-2 text-xs text-slate-400">Kredi talebi, kesintinin gerçekleşmesinden itibaren 15 gün içinde support@tracora.ai adresine yazılı olarak yapılmalıdır.</p>
            </div>
          </section>

          {/* Ücret ve Ödeme */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 4 — Ücretlendirme ve Ödeme Koşulları</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Abonelik ücreti, her dönem başında Kullanıcı'nın belirttiği ödeme yöntemiyle otomatik tahsil edilir.</li>
              <li>Fiyatlar KDV hariç olup Türkiye merkezli kullanıcılar için ilgili oran faturaya yansıtılır.</li>
              <li>Tracora, fiyat değişikliklerini en az <strong className="text-white">30 gün</strong> önceden bildirir. Kullanıcı, değişikliği kabul etmiyorsa değişikliğin yürürlüğe girmesinden önce aboneliğini iptal edebilir.</li>
              <li>Ödeme başarısız olması halinde Tracora; 7 gün içinde yeniden tahsilat dener, başarısız olması durumunda erişimi kısıtlayabilir ve 30 günlük ödeme sonunda sözleşmeyi feshedebilir.</li>
              <li>Yıllık aboneliklerde yapılan ara dönem iptallerde iade yapılmaz; kalan süre için hizmet erişimi devam eder.</li>
            </ul>
          </section>

          {/* Gizlilik */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 5 — Gizlilik ve Ticari Sır</h2>
            <p>
              Taraflar, bu Sözleşme kapsamında öğrendikleri karşı tarafa ait ticari sırları,
              iş planlarını, müşteri listelerini ve teknik bilgileri gizli tutmayı ve üçüncü
              taraflara ifşa etmemeyi taahhüt eder. Bu yükümlülük; Sözleşme'nin sona ermesinden
              itibaren <strong className="text-white">5 (beş) yıl</strong> süreyle geçerliliğini korur.
            </p>
            <p className="mt-3">
              Kullanıcı; izleme sorguları, marka stratejileri ve Platform üzerinden elde ettiği
              analizlerin ticari sır niteliği taşıyabileceğini kabul eder. Tracora bu bilgileri
              Gizlilik Politikası'nda belirtilen sınırlar dahilinde işler.
            </p>
            <p className="mt-3">
              Tracora çalışanları ve yüklenicileri, kullanıcı verilerine erişim için gizlilik
              anlaşması (NDA) imzalamaktadır. Kullanıcı verilerine yalnızca destek ve hizmet
              sürekliliği amaçlı, zorunlu hallerde ve asgari düzeyde erişilir.
            </p>
          </section>

          {/* Fikri Mülkiyet */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 6 — Fikri Mülkiyet Hakları</h2>
            <div className="space-y-3 mt-3">
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Tracora'nın Hakları</p>
                <p className="text-xs text-slate-300">Platform yazılımı, algoritmalar, arayüz tasarımları, raporlama metodolojisi, marka, logo ve ticari ad dahil tüm fikri mülkiyet Tracora'ya aittir. Kullanıcı, bu unsurları kopyalayamaz, değiştiremez, tersine mühendislik uygulayamaz veya türev çalışmalar oluşturamaz.</p>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Kullanıcının Hakları</p>
                <p className="text-xs text-slate-300">Kullanıcı, kendi marka adları, logoları ve oluşturduğu içerikler üzerindeki fikri mülkiyet haklarını muhafaza eder. Tracora'ya yalnızca hizmetin sunulmasına yönelik sınırlı işleme izni tanınmıştır.</p>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Rakip Geliştirme Yasağı</p>
                <p className="text-xs text-slate-300">Kullanıcı; Platform erişimi süresince ve erişim sona erdikten sonra <strong className="text-white">12 ay boyunca</strong>, Platform'dan edindiği öğrenimlerle doğrudan rakip bir ürün veya hizmet geliştirmek amacıyla Tracora'nın özel algoritma, metodoloji veya süreçlerini kullanamaz.</p>
              </div>
            </div>
          </section>

          {/* Beyan ve Taahhütler */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 7 — Kullanıcı Beyan ve Taahhütleri</h2>
            <p>Kullanıcı; bu Sözleşme'yi imzalamakla aşağıdakileri beyan ve taahhüt eder:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>18 yaşını doldurmuş ve yasal ehliyete sahip olduğunu ya da tüzel kişiliği temsil yetkisi bulunduğunu,</li>
              <li>Verdiği tüm bilgilerin doğru, eksiksiz ve güncel olduğunu,</li>
              <li>Platform'u yalnızca hukuka uygun amaçlarla kullanacağını,</li>
              <li>Üçüncü tarafların fikri mülkiyet, gizlilik veya diğer haklarını ihlal etmeyeceğini,</li>
              <li>Platform'dan elde edilen verileri yanıltıcı reklam, dezenformasyon veya rakip firmalar hakkında asılsız iddia yapmak amacıyla kullanmayacağını,</li>
              <li>Hizmet altyapısına zarar verebilecek, aşırı yük oluşturabilecek veya güvenliği tehdit edebilecek eylemlerden kaçınacağını.</li>
            </ul>
          </section>

          {/* Sorumluluk */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 8 — Sorumluluk ve Tazminat</h2>
            <p>
              Tracora'nın bu Sözleşme'den doğan toplam sorumluluğu, zararın gerçekleştiği tarihten
              önceki <strong className="text-white">12 (on iki) aylık dönemde</strong> Kullanıcı tarafından ödenen abonelik
              ücretini aşamaz.
            </p>
            <p className="mt-3">
              Tracora; kâr kaybı, itibar kaybı, veri kaybı veya dolaylı zararlar dahil olmak üzere
              hiçbir özel, arızi veya sonuç niteliğindeki zarardan sorumlu değildir.
            </p>
            <p className="mt-3">
              Kullanıcı; bu Sözleşme veya ekleri kapsamındaki yükümlülüklerini ihlal etmesi
              nedeniyle Tracora'nın, yöneticilerinin, çalışanlarının ve iş ortaklarının
              maruz kaldığı her türlü zarar, masraf, ceza ve makul avukatlık ücretini tazmin etmeyi kabul eder.
            </p>
          </section>

          {/* Fesih */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 9 — Sözleşmenin Feshi</h2>
            <div className="space-y-3 mt-3">
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Kullanıcı Tarafından Fesih</p>
                <p className="text-xs text-slate-300">Kullanıcı, hesap ayarları üzerinden dilediği zaman aboneliğini iptal edebilir. İptal işlemi mevcut ödeme dönemi sonunda geçerli olur; erken iptallerde kalan süreye ilişkin iade yapılmaz.</p>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Tracora Tarafından Fesih — Bildirimsiz</p>
                <p className="text-xs text-slate-300">Kullanım şartlarının ağır ihlali, dolandırıcılık, sisteme izinsiz erişim girişimi veya güvenlik tehdidi hallerinde Tracora, önceden bildirim yapmaksızın sözleşmeyi feshedebilir ve hesabı kapatabilir.</p>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Tracora Tarafından Fesih — Bildirimli</p>
                <p className="text-xs text-slate-300">Tekrarlanan ödeme gecikmeleri veya hafif ihlaller nedeniyle fesih kararında Tracora, en az 15 gün önceden e-posta ile bildirim yapar ve Kullanıcı'ya düzeltme imkânı tanır.</p>
              </div>
            </div>
            <p className="mt-4">
              Fesih sonrası Kullanıcı'ya ait veriler, Gizlilik Politikası'nda belirlenen saklama
              sürelerine uygun olarak yönetilir. Kullanıcı, fesihten önceki 30 gün içinde
              verilerinin taşınabilir bir kopyasını talep edebilir.
            </p>
          </section>

          {/* Rekabet yasağı ve benzeri */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 10 — Haksız Rekabet Koruması</h2>
            <p>
              Taraflar, bu Sözleşme kapsamındaki ticari ilişki süresince ve ilişkinin sona
              ermesinden sonraki 12 ay boyunca karşı taraf hakkında kamuoyuna yönelik
              aşağıdaki eylemlerde bulunmamayı taahhüt eder:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>Gerçek dışı, yanıltıcı veya aşağılayıcı beyanlarda bulunmak</li>
              <li>Ticari itibarı zedeleyecek içerik yayımlamak veya üçüncü taraflara iletmek</li>
              <li>Hizmet veya ürün kalitesine ilişkin doğrulanmamış olumsuz iddialar yaymak</li>
            </ul>
            <p className="mt-3">
              Bu madde; dürüst ve olgusal nitelikteki kullanıcı yorumlarını, mesleki eleştiriyi
              veya yetkili makam bildirimi kapsamındaki ifadeleri kapsamamaktadır.
            </p>
            <p className="mt-3">
              Tracora; 6102 sayılı Türk Ticaret Kanunu'nun 54-63. maddeleri kapsamındaki haksız
              rekabet yasağına uymayı ve rakipler hakkında yalnızca doğrulanabilir, dürüst ve
              yanıltıcı olmayan bilgilere yer vermeyi taahhüt etmektedir.
            </p>
          </section>

          {/* Uyuşmazlık çözümü */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 11 — Uyuşmazlık Çözümü</h2>
            <p>
              Bu Sözleşme'den doğan uyuşmazlıklar aşağıdaki aşamalı süreçle çözüme kavuşturulur:
            </p>
            <ol className="list-decimal list-inside mt-3 space-y-3 ml-4">
              <li>
                <strong className="text-white">Müzakere (30 gün):</strong> Taraflar, uyuşmazlığı önce iyi niyetle müzakere
                yoluyla çözmeye çalışır. Müzakere talebi yazılı olarak iletilir.
              </li>
              <li>
                <strong className="text-white">Arabuluculuk (60 gün):</strong> Müzakere sonuçsuz kalırsa, 7036 sayılı
                İş Mahkemeleri Kanunu ve/veya ticari uyuşmazlıklara ilişkin arabuluculuk
                mevzuatı çerçevesinde arabuluculuk yoluna başvurulabilir.
              </li>
              <li>
                <strong className="text-white">Yargı yolu:</strong> Arabuluculuğun da sonuçsuz kalması halinde
                <strong className="text-white"> İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri</strong> münhasıran yetkilidir.
              </li>
            </ol>
            <p className="mt-4">
              Bu Sözleşme, Türkiye Cumhuriyeti hukukuna tabidir. Tüketici konumundaki kullanıcılar
              için İl/İlçe Tüketici Hakem Heyetleri de yetkilidir.
            </p>
          </section>

          {/* Diğer */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 12 — Çeşitli Hükümler</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-white">Değişiklikler:</strong> Tracora, bu Sözleşme'yi önemli değişiklikler için
                en az 30 gün önceden bildirim yapmak koşuluyla güncelleme hakkına sahiptir.
                Bildirim sonrasında Hizmet'i kullanmaya devam etmek, değişikliklerin kabulü anlamına gelir.
              </li>
              <li>
                <strong className="text-white">Tüm Sözleşme:</strong> Bu Sözleşme; Kullanım Şartları ve Gizlilik Politikası
                ile birlikte taraflar arasındaki sözleşmenin tamamını oluşturmaktadır.
              </li>
              <li>
                <strong className="text-white">Devir:</strong> Kullanıcı, bu Sözleşme'den doğan hak veya yükümlülüklerini
                Tracora'nın yazılı onayı olmaksızın üçüncü taraflara devredemez. Tracora,
                sözleşmeyi iş ortağına veya bağlı kuruluşa devredebilir; bu durumda Kullanıcı
                30 gün içinde bildirilir.
              </li>
              <li>
                <strong className="text-white">Bölünebilirlik:</strong> Bir hükmün geçersiz sayılması, diğer hükümlerin
                geçerliliğini etkilemez.
              </li>
              <li>
                <strong className="text-white">Elektronik İmza:</strong> Kayıt formunun onaylanması ve "Kabul ediyorum"
                kutusunun işaretlenmesi, 5070 sayılı Elektronik İmza Kanunu kapsamında geçerli
                elektronik rıza ve kabul niteliği taşımaktadır.
              </li>
            </ul>
          </section>

          {/* İletişim */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Madde 13 — İletişim ve Tebligat</h2>
            <p>
              Sözleşme kapsamındaki tüm bildirimler yazılı olarak (e-posta dahil) yapılır.
              Tracora'ya yönelik tebligatlar aşağıdaki adrese gönderilmelidir:
            </p>
            <div className="bg-white/3 border border-white/5 rounded-xl p-5 mt-4 space-y-2">
              <p><strong className="text-white">Tracora — Hukuk Birimi</strong></p>
              <p>E-posta: <a href="mailto:legal@tracora.ai" className="text-indigo-400 hover:text-indigo-300">legal@tracora.ai</a></p>
              <p>Genel: <a href="mailto:support@tracora.ai" className="text-indigo-400 hover:text-indigo-300">support@tracora.ai</a></p>
              <p>Web: <a href="https://tracora.ai" className="text-indigo-400 hover:text-indigo-300">https://tracora.ai</a></p>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Kullanıcı'ya yönelik bildirimler, kayıt sırasında belirtilen e-posta adresine
              gönderilir. Kullanıcı, e-posta adres değişikliğini derhal hesap ayarlarından
              güncellemekle yükümlüdür.
            </p>
          </section>

        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/terms" className="hover:text-indigo-400 transition-colors">Kullanım Şartları</Link>
          <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Gizlilik Politikası</Link>
          <Link href="/" className="hover:text-indigo-400 transition-colors">Ana Sayfa</Link>
        </div>
      </main>
    </div>
  );
}
