import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — Tracora",
  description: "Tracora olarak kişisel verilerinizi KVKK ve GDPR kapsamında nasıl işlediğimizi öğrenin.",
};

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-white mb-3">Gizlilik Politikası</h1>
          <p className="text-slate-400 text-sm">Son güncelleme: 1 Temmuz 2025 &nbsp;|&nbsp; Yürürlük tarihi: 1 Temmuz 2025</p>
          <div className="mt-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
            <p className="text-indigo-300 text-sm">
              Bu belge; 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Genel Veri Koruma Tüzüğü (GDPR)
              kapsamındaki aydınlatma yükümlülüğümüz çerçevesinde hazırlanmıştır.
            </p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-sm leading-7">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı KVKK ve GDPR kapsamında <strong className="text-white">veri sorumlusu</strong> sıfatını taşıyan
              kuruluş <strong className="text-white">Tracora</strong>'dır.
            </p>
            <div className="bg-white/3 border border-white/5 rounded-xl p-5 mt-4 space-y-1.5">
              <p><strong className="text-white">Tracora</strong></p>
              <p>Web: <a href="https://tracora.ai" className="text-indigo-400 hover:text-indigo-300">https://tracora.ai</a></p>
              <p>Veri koruma iletişim: <a href="mailto:privacy@tracora.ai" className="text-indigo-400 hover:text-indigo-300">privacy@tracora.ai</a></p>
              <p>KVKK başvuruları: <a href="mailto:kvkk@tracora.ai" className="text-indigo-400 hover:text-indigo-300">kvkk@tracora.ai</a></p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. İşlenen Kişisel Veriler</h2>
            <p>Tracora, aşağıdaki kategorilerde kişisel veri işlemektedir:</p>

            <div className="mt-4 space-y-4">
              <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">Kimlik ve İletişim Verileri</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Ad, soyad (isteğe bağlı)</li>
                  <li>E-posta adresi</li>
                  <li>Şirket adı ve ünvanı (isteğe bağlı)</li>
                </ul>
              </div>

              <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">Hesap ve Abonelik Verileri</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Hesap oluşturma tarihi ve son giriş bilgisi</li>
                  <li>Seçilen abonelik planı ve ödeme geçmişi özeti</li>
                  <li>Fatura bilgileri (ödeme işlemcisi üzerinden yönetilir)</li>
                </ul>
              </div>

              <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">Kullanım ve Analitik Verileri</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>IP adresi ve yaklaşık konum bilgisi</li>
                  <li>Tarayıcı türü, işletim sistemi, cihaz türü</li>
                  <li>Hizmet içi sayfa ziyaretleri ve tıklama örüntüleri</li>
                  <li>API istek kayıtları (rate limiting ve güvenlik amaçlı)</li>
                </ul>
              </div>

              <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">İzleme İçeriği Verileri</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Kullanıcının tanımladığı marka adları, anahtar kelimeler ve sorgular</li>
                  <li>AI motorlarından alınan ham yanıtlar ve görünürlük metrikleri</li>
                  <li>Bu veriler yalnızca Hizmet'i sunmak amacıyla işlenir</li>
                </ul>
              </div>
            </div>

            <p className="mt-4">
              <strong className="text-white">Özel nitelikli kişisel veri işlemiyoruz.</strong> Irk, etnik köken,
              siyasi görüş, dini inanç, sağlık, biyometrik veya cezai sicile ilişkin veri toplamıyoruz.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Kişisel Verilerin İşlenme Amaçları ve Hukuki Dayanakları</h2>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white font-medium">Amaç</th>
                    <th className="text-left py-3 px-4 text-white font-medium">Hukuki Dayanak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4">Hesap oluşturma ve kimlik doğrulama</td>
                    <td className="py-3 px-4">Sözleşmenin ifası (KVKK m.5/2-c)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Abonelik yönetimi ve faturalandırma</td>
                    <td className="py-3 px-4">Sözleşmenin ifası; yasal yükümlülük</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">AI görünürlük takip hizmetinin sunulması</td>
                    <td className="py-3 px-4">Sözleşmenin ifası (KVKK m.5/2-c)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Müşteri desteği ve sorun giderme</td>
                    <td className="py-3 px-4">Sözleşmenin ifası; meşru menfaat</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Güvenlik, sahtekârlık önleme ve denetim kayıtları</td>
                    <td className="py-3 px-4">Meşru menfaat (KVKK m.5/2-f); yasal yükümlülük</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Hizmet performansının ölçülmesi ve iyileştirilmesi</td>
                    <td className="py-3 px-4">Meşru menfaat (KVKK m.5/2-f)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Pazarlama e-postaları ve ürün güncellemeleri</td>
                    <td className="py-3 px-4">Açık rıza (KVKK m.5/1); vazgeçilebilir</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Yasal yükümlülüklere uyum ve resmi talepler</td>
                    <td className="py-3 px-4">Yasal yükümlülük (KVKK m.5/2-ç)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Kişisel Verilerin Aktarımı</h2>
            <p>Kişisel verileriniz aşağıdaki kategorilerdeki alıcılara aktarılabilir:</p>

            <div className="mt-4 space-y-3">
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Altyapı ve Bulut Hizmetleri</p>
                <p className="text-xs text-slate-400">Supabase (veritabanı, kimlik doğrulama — AB veri merkezleri), Vercel (hosting — AB/ABD), OpenAI (AI sorgu işleme).</p>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Ödeme İşlemcileri</p>
                <p className="text-xs text-slate-400">Stripe veya eşdeğer PCI-DSS uyumlu ödeme altyapısı. Kart bilgileri Tracora sunucularında saklanmaz.</p>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Bildirim ve Entegrasyon Hizmetleri</p>
                <p className="text-xs text-slate-400">Slack, Microsoft Teams, HubSpot, Salesforce — yalnızca kullanıcının açıkça etkinleştirdiği entegrasyonlar kapsamında ve sınırlı veriyle.</p>
              </div>
              <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                <p className="text-white font-medium text-sm mb-1">Yasal Yükümlülükler</p>
                <p className="text-xs text-slate-400">Mahkeme kararı, savcılık talebi veya yasal zorunluluk halinde yetkili makamlarla paylaşım yapılabilir.</p>
              </div>
            </div>

            <p className="mt-4">
              Yurt dışına veri aktarımı; GDPR Standart Sözleşme Hükümleri (SCC) ve/veya KVKK'nın
              9. maddesi kapsamındaki güvenceler çerçevesinde gerçekleştirilir. Kişisel verilerinizi
              pazarlama amaçlı olarak üçüncü taraflara satmıyor ve kiralamıyoruz.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Veri Saklama Süreleri</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white font-medium">Veri Kategorisi</th>
                    <th className="text-left py-3 px-4 text-white font-medium">Saklama Süresi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4">Hesap ve profil bilgileri</td>
                    <td className="py-3 px-4">Hesap kapatılana kadar + 30 gün</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Fatura ve ödeme kayıtları</td>
                    <td className="py-3 px-4">10 yıl (Vergi Usul Kanunu gereği)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">AI sorgu sonuçları ve raporlar</td>
                    <td className="py-3 px-4">Abonelik süresince + 90 gün</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Güvenlik ve denetim kayıtları</td>
                    <td className="py-3 px-4">2 yıl</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Müşteri destek yazışmaları</td>
                    <td className="py-3 px-4">3 yıl</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Pazarlama rızası kayıtları</td>
                    <td className="py-3 px-4">Rıza geri çekilene kadar + 3 yıl</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Süre dolumunda veriler güvenli biçimde silinir veya anonimleştirilir.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Çerezler ve İzleme Teknolojileri</h2>
            <p>Tracora, aşağıdaki amaçlar için çerez ve benzeri teknolojiler kullanmaktadır:</p>
            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0"></span>
                <div>
                  <p className="text-white text-sm font-medium">Zorunlu Çerezler</p>
                  <p className="text-xs text-slate-400 mt-0.5">Oturum yönetimi ve güvenlik. Devre dışı bırakılamaz; bunlar olmadan Hizmet çalışmaz.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></span>
                <div>
                  <p className="text-white text-sm font-medium">Analitik Çerezler</p>
                  <p className="text-xs text-slate-400 mt-0.5">Hizmet kullanımını ölçmek için. Açık rızanıza tabidir; hesap ayarlarından yönetilebilir.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-slate-400 flex-shrink-0"></span>
                <div>
                  <p className="text-white text-sm font-medium">Tercih Çerezleri</p>
                  <p className="text-xs text-slate-400 mt-0.5">Dil, tema ve arayüz tercihlerinizi hatırlamak için.</p>
                </div>
              </div>
            </div>
            <p className="mt-4">Üçüncü taraf reklam çerezi kullanmıyoruz ve kişisel verilerinizi reklam amacıyla profilleme yapmıyoruz.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. KVKK Kapsamındaki Veri Sahibi Hakları</h2>
            <p>
              KVKK'nın 11. maddesi uyarınca kişisel verilerinize ilişkin aşağıdaki haklara sahipsiniz:
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { right: "Bilgi edinme hakkı", desc: "Verilerinizin işlenip işlenmediğini öğrenme" },
                { right: "Erişim hakkı", desc: "İşlenen verilerinizi talep etme" },
                { right: "Düzeltme hakkı", desc: "Hatalı veya eksik verilerin düzeltilmesini isteme" },
                { right: "Silme hakkı", desc: "Koşullar oluştuğunda verilerinizin silinmesini talep etme" },
                { right: "İşlemenin kısıtlanması", desc: "Belirli durumlarda işlemenin durdurulmasını isteme" },
                { right: "İtiraz hakkı", desc: "Meşru menfaat kapsamındaki işlemelere itiraz etme" },
                { right: "Taşınabilirlik hakkı", desc: "Verilerinizi makine okunabilir formatta alma" },
                { right: "Rıza geri çekme hakkı", desc: "Rızaya dayalı işlemleri her zaman durdurma" },
              ].map((item) => (
                <div key={item.right} className="bg-white/3 border border-white/5 rounded-lg p-4">
                  <p className="text-white text-sm font-medium">{item.right}</p>
                  <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-5">
              Haklarınızı kullanmak için <a href="mailto:kvkk@tracora.ai" className="text-indigo-400 hover:text-indigo-300">kvkk@tracora.ai</a> adresine
              yazılı başvurabilirsiniz. Kimlik doğrulaması amacıyla ek bilgi talep edilebilir.
              Başvurular, yasal süreler içinde (en geç 30 gün) yanıtlanır.
            </p>
            <p className="mt-3">
              Başvurunuzun reddedildiğini düşünüyorsanız <strong className="text-white">Kişisel Verileri Koruma Kurumu (KVKK)</strong>'na
              şikâyette bulunma hakkınız saklıdır.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Güvenlik Önlemleri</h2>
            <p>Kişisel verilerinizi korumak için uyguladığımız teknik ve idari tedbirler:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-4">
              <li>TLS 1.3 ile transit şifreleme; AES-256 ile saklama şifrelemesi</li>
              <li>HttpOnly, Secure ve SameSite öznitelikli oturum çerezleri</li>
              <li>Rol bazlı erişim kontrolü (RBAC) ve en az yetki ilkesi</li>
              <li>IP tabanlı hız sınırlama ve brute-force koruması</li>
              <li>Tüm işlemler için denetim kayıtları (audit log)</li>
              <li>Güvenlik açığı yönetimi ve düzenli sızma testleri</li>
              <li>Çalışan gizlilik eğitimi ve gizlilik anlaşması (NDA)</li>
            </ul>
            <p className="mt-4">
              Güvenlik ihlali tespiti halinde etkilenen kullanıcılar ve yetkili makamlar KVKK
              ve GDPR'ın öngördüğü süreler içinde (72 saat) bilgilendirilir.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Çocukların Gizliliği</h2>
            <p>
              Hizmet 18 yaşın altındaki bireylere yönelik değildir ve bu kişilerden bilerek veri
              toplanmaz. 18 yaşın altındaki bir bireyin verilerinin sistemimizde bulunduğunu
              düşünüyorsanız lütfen <a href="mailto:privacy@tracora.ai" className="text-indigo-400 hover:text-indigo-300">privacy@tracora.ai</a> ile iletişime geçin.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Politika Değişiklikleri</h2>
            <p>
              Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler, yürürlük
              tarihinden en az 30 gün önce kayıtlı e-posta adresinize bildirilecektir. Güncel
              politika her zaman bu sayfada yayımlanır.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">11. İletişim</h2>
            <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-2">
              <p><strong className="text-white">Tracora — Gizlilik Birimi</strong></p>
              <p>Genel gizlilik soruları: <a href="mailto:privacy@tracora.ai" className="text-indigo-400 hover:text-indigo-300">privacy@tracora.ai</a></p>
              <p>KVKK başvuruları: <a href="mailto:kvkk@tracora.ai" className="text-indigo-400 hover:text-indigo-300">kvkk@tracora.ai</a></p>
              <p>Güvenlik bildirimleri: <a href="mailto:security@tracora.ai" className="text-indigo-400 hover:text-indigo-300">security@tracora.ai</a></p>
              <p>Web: <a href="https://tracora.ai" className="text-indigo-400 hover:text-indigo-300">https://tracora.ai</a></p>
            </div>
          </section>

        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/terms" className="hover:text-indigo-400 transition-colors">Kullanım Şartları</Link>
          <Link href="/user-agreement" className="hover:text-indigo-400 transition-colors">Kullanıcı Sözleşmesi</Link>
          <Link href="/" className="hover:text-indigo-400 transition-colors">Ana Sayfa</Link>
        </div>
      </main>
    </div>
  );
}
